import { connect } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { createNotification } from "../reducers/notificationReducer"

const AnecdoteForm = (props) => {
  const newAnecdote = async (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ""

    props.createAnecdote(anecdote)
    props.createNotification(`you created '${anecdote}'`, 5)
  }

  return (
    <div>
      <h2>create new</h2>
        <form onSubmit={newAnecdote}>
          <div><input name='anecdote' /></div>
          <button type='submit'>create</button>
        </form>
    </div>
  )
}

const dispatchToProps = {
  createAnecdote,
  createNotification,
}

const ConnectedAnecdoteForms = connect(null, dispatchToProps)(AnecdoteForm)
export default ConnectedAnecdoteForms
