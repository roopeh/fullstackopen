import { useQuery } from "@apollo/client/react"
import { useState } from "react"
import Queries from "../graphql/queries"
import BookTable from "./BookTable"

const Books = ({ show }) => {
  if (!show) {
    return null
  }

  const allGenres = "all genres"
  const [chosenGenre, setChosenGenre] = useState(allGenres)
  const [genres, setGenres] = useState([])

  const queryVariables = chosenGenre === allGenres
    ? { fetchPolicy: "network-only" }
    : { variables: { genre: chosenGenre }, fetchPolicy: "network-only" }

  const booksQuery = useQuery(Queries.AllBooks, queryVariables)
  if (booksQuery.loading) {
    return <div>loading...</div>
  }

  const books = booksQuery.data.allBooks

  books.forEach((book) => {
    book.genres.forEach((genre) => {
      if (!genres.includes(genre)) {
        setGenres(genres.concat(genre))
      }
    })
  })

  /*
  *** 8.19 frontend version ***
  if (chosenGenre !== allGenres) {
    books = books.filter((book) => book.genres.includes(chosenGenre))
  } */

  return (
    <div>
      <h2>books</h2>
      {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
      {chosenGenre !== allGenres ? <span>in genre <b>{chosenGenre}</b></span> : null}
      <BookTable books={books} />
      <br />
      {genres.map((genre) => (
        <button key={genre} type="button" onClick={() => setChosenGenre(genre)}>{genre}</button>
      ))}
      <button type="button" onClick={() => setChosenGenre(allGenres)}>{allGenres}</button>
    </div>
  )
}

export default Books
