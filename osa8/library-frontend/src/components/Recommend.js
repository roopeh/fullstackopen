import { useQuery } from "@apollo/client/react"
import Queries from "../graphql/queries"
import BookTable from "./BookTable"

const Recommend = ({ show }) => {
  if (!show) {
    return null
  }

  const { loading: loadingUser, data: dataUser } = useQuery(Queries.Me)
  const { loading: loadingBooks, data: dataBooks } = useQuery(Queries.AllBooks, {
    skip: !dataUser,
    fetchPolicy: "network-only",
    variables: { genre: dataUser && dataUser.me.favoriteGenre },
  })

  if (loadingUser || loadingBooks) {
    return <div>loading...</div>
  }

  const user = dataUser.me
  const books = dataBooks.allBooks

  return (
    <div>
      <h2>recommendations</h2>
      {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
      books in your favorite genre <b>{user.favoriteGenre}</b>
      <BookTable books={books} />
    </div>
  )
}

export default Recommend
