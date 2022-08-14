import { useMutation, useQuery } from "@apollo/client/react"
import { useState } from "react"
import Select from "react-select"
import Queries from "../graphql/queries"

const Authors = ({ show, sendError }) => {
  if (!show) {
    return null
  }

  const [born, setBorn] = useState("")
  const [selectedAuthor, setSelectedAuthor] = useState(null)
  const [editBirthDate] = useMutation(Queries.EditBirthDate, {
    refetchQueries: [{ query: Queries.AllAuthors }],
    onError: (error) => sendError(error.graphQLErrors[0].message),
  })

  const authorsQuery = useQuery(Queries.AllAuthors)
  if (authorsQuery.loading) {
    return <div>loading...</div>
  }

  const authors = authorsQuery.data.allAuthors

  const changeBirthDate = (event) => {
    event.preventDefault()
    editBirthDate({
      variables: {
        name: selectedAuthor.label, born,
      },
    })

    setSelectedAuthor(null)
    setBorn("")
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th> </th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />

      <h3>Set birthyear</h3>
      <Select
        defaultValue={selectedAuthor}
        onChange={setSelectedAuthor}
        options={authors.map((author) => ({ value: author.name, label: author.name }))}
      />
      <form onSubmit={changeBirthDate}>
        <table>
          <tbody>
            <tr>
              <td>born</td>
              <td><input type="number" value={born} onChange={({ target }) => setBorn(parseInt(target.value, 10))} /></td>
            </tr>
            <tr>
              <td> </td>
              <td><button type="submit">Update author</button></td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  )
}

export default Authors
