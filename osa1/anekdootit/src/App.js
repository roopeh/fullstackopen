import React, { useState } from 'react'

const Header = ({ text }) => <h1>{text}</h1>
const Button = ({ text, click }) => <button onClick={click}>{text}</button>

const Anecdote = ({ text, votes }) => {
  return (
    <div>
      <big>
        {text} <br />
        has {votes} votes <br />
      </big>
    </div>
  )
}

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min) + min)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))

  const voteAnecdote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  const getIndexWithMostVotes = () => {
    const index = points.indexOf(Math.max.apply(Math, points))
    return index == -1 ? 0 : index
  }
  const indexWithMostVotes = getIndexWithMostVotes()

  return (
    <div>
      <Header text="Anecdote of the day" />
      <Anecdote text={anecdotes[selected]} votes={points[selected]} />
      <Button text="vote" click={() => voteAnecdote()} />
      <Button text="next anecdote" click={() => setSelected(getRandomNumber(0, anecdotes.length))} />

      <Header text="Anecdote with most votes" />
      <Anecdote text={anecdotes[indexWithMostVotes]} votes={points[indexWithMostVotes]} />
    </div>
  )
}

export default App
