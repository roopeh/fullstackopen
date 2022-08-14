import { useApolloClient, useSubscription } from "@apollo/client"
import { useState } from "react"
import Authors from "./components/Authors"
import Books from "./components/Books"
import ErrorNotify from "./components/ErrorNotify"
import Login from "./components/Login"
import NewBook from "./components/NewBook"
import Recommend from "./components/Recommend"
import Queries from "./graphql/queries"
import UpdateCache from "./graphql/updateCache"

const App = () => {
  const [page, setPage] = useState("authors")
  const [error, setError] = useState("")
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useSubscription(Queries.BookAdded, {
    onSubscriptionData: ({ subscriptionData }) => {
      const newBook = subscriptionData.data.bookAdded
      window.alert(`New book '${newBook.title}' added`)
      UpdateCache(client.cache, { query: Queries.AllBooks }, newBook)
    },
  })

  const createErrorMessage = (message) => {
    setError(message)
    setTimeout(() => {
      setError(null)
    }, 5000)
  }

  const successLogin = (userToken) => {
    setToken(userToken)
    setPage("authors")
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage("authors")
  }

  return (
    <div>
      <div>
        <button type="button" onClick={() => setPage("authors")}>authors</button>
        <button type="button" onClick={() => setPage("books")}>books</button>
        {token
          ? (
            <span>
              <button type="button" onClick={() => setPage("add")}>add book</button>
              <button type="button" onClick={() => setPage("recommend")}>recommend</button>
              <button type="button" onClick={logout}>logout</button>
            </span>
          ) : (
            <button type="button" onClick={() => setPage("login")}>login</button>
          )}
      </div>

      <Authors show={page === "authors"} sendError={createErrorMessage} />

      <Books show={page === "books"} />

      <Login show={page === "login"} successLogin={successLogin} sendError={createErrorMessage} />

      <NewBook show={page === "add"} sendError={createErrorMessage} />

      <Recommend show={page === "recommend"} />

      <ErrorNotify message={error} />

    </div>
  )
}

export default App
