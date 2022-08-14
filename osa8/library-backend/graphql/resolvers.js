const { UserInputError, AuthenticationError } = require("apollo-server")
const { PubSub } = require("graphql-subscriptions")
const jwt = require("jsonwebtoken")
const config = require("../utils/config")
const Author = require("../models/Author")
const Book = require("../models/Book")
const User = require("../models/User")

const pubsub = new PubSub()

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let findArguments = { }
      if (args.author) {
        const author = await Author.findOne({ name: args.author })
        if (!author) {
          throw new UserInputError("Author not found", {
            invalidArgs: args.author,
          })
        }

        // eslint-disable-next-line no-underscore-dangle
        findArguments = { author: author._id }
      }

      if (args.genre) {
        findArguments = { ...findArguments, genres: { $in: [args.genre] } }
      }

      return Book.find(findArguments).populate("author", { name: 1 })
    },
    allAuthors: async () => Author.find({}),
    me: (root, args, context) => context.currentUser,
  },
  Author: {
    bookCount: async (root) => Book.count({
      // eslint-disable-next-line no-underscore-dangle
      author: root._id,
    }),
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const { currentUser } = context
      if (!currentUser) {
        throw new AuthenticationError("Not authenticated")
      }

      let author = await Author.findOne({ name: args.author })
      if (!author) {
        try {
          author = new Author({ name: args.author })
          await author.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args.author,
          })
        }
      }

      // eslint-disable-next-line no-underscore-dangle
      const book = new Book({ ...args, author: author._id })
      book.populate("author", { name: 1 })

      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      pubsub.publish("bookAdded", { bookAdded: book })

      return book
    },
    editAuthor: async (root, args, context) => {
      const { currentUser } = context
      if (!currentUser) {
        throw new AuthenticationError("Not authenticated")
      }

      const author = await Author.findOne({ name: args.name })
      if (!author) {
        throw new UserInputError("User not found", {
          invalidArgs: args.name,
        })
      }

      author.born = args.setBornTo
      return author.save()
    },
    createUser: async (root, args) => {
      const user = new User({ ...args })

      try {
        await user.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args.username,
        })
      }

      return user
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== "123") {
        throw new UserInputError("Invalid credentials")
      }

      const userForToken = {
        username: user.username,
        // eslint-disable-next-line no-underscore-dangle
        id: user._id,
      }

      return { value: jwt.sign(userForToken, config.JWT_SECRET) }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(["bookAdded"]),
    },
  },
}

module.exports = resolvers
