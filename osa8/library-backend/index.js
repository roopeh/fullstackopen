/* eslint-disable max-len */
const { ApolloServer } = require("apollo-server-express")
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core")
const { makeExecutableSchema } = require("@graphql-tools/schema")
const { execute, subscribe } = require("graphql")
const { SubscriptionServer } = require("subscriptions-transport-ws")
const express = require("express")
const http = require("http")
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
const config = require("./utils/config")
const typeDefs = require("./graphql/schemas")
const resolvers = require("./graphql/resolvers")
const User = require("./models/User")

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
*/

mongoose.connect(config.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(`Error while connecting to MongoDB: ${err}`))

const start = async () => {
  const app = express()
  const httpServer = http.createServer(app)

  const schema = makeExecutableSchema({ typeDefs, resolvers })

  const subscriptionServer = SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
    },
    {
      server: httpServer,
      path: "",
    },
  )

  const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
      let currentUser = null
      const auth = req ? req.headers.authorization : null
      if (auth && auth.toLowerCase().startsWith("bearer ")) {
        const decodedToken = jwt.verify(auth.substring(7), config.JWT_SECRET)
        currentUser = await User.findById(decodedToken.id)
      }

      return { currentUser }
    },
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close()
            },
          }
        },
      },
    ],
  })

  await server.start()

  server.applyMiddleware({
    app,
    path: "/",
  })

  const PORT = 4000

  httpServer.listen(PORT, () => {
    console.log(`Server is now running on http://localhost:${PORT}`)
  })
}

// call the function that does the setup and starts the server
start()
