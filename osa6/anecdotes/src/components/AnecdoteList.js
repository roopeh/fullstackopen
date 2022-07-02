import { useSelector, useDispatch } from "react-redux"
import { addVote } from "../reducers/anecdoteReducer"
import { createNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
  const anecdotes = [...useSelector(state => {
    return !state.filter ?
      state.anecdotes :
      state.anecdotes.filter(itr => itr.content.toUpperCase().includes(state.filter.toUpperCase()))
  })]

  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(addVote(anecdote))
    dispatch(createNotification(`you voted '${anecdote.content}'`, 5))
  }

  return (
    anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote)}>vote</button>
        </div>
      </div>
    )
  )
}

export default AnecdoteList
