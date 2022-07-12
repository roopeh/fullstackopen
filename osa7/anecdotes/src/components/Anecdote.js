import { useParams } from "react-router-dom"

const Anecdote = ({ anecdotes }) => {
  const id = Number(useParams().id)
  const anecdote = anecdotes.find(obj => obj.id === id)

  if (!anecdote) {
    return (
      <div>
        <h2>404 - Anecdote not found</h2>
      </div>
    )
  }

  return (
    <div>
      <h2>{anecdote.content} by {anecdote.author}</h2>
      <p>
        has {anecdote.votes} votes<br /><br />
        for more info see <a href={anecdote.info}>{anecdote.info}</a>
      </p>
    </div>
  )
}

export default Anecdote
