import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"

const getId = () => (100000 * Math.random()).toFixed(0)

export const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const oldAnecdote = state.find(n => n.id === action.payload)
      const newAnecdote = { ...oldAnecdote, votes: oldAnecdote.votes + 1 }
      return state.map(anecdote => anecdote.id !== action.payload ? anecdote : newAnecdote)
    },
    addAnecdoteToState(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (anecdote) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.saveAnecdote(anecdote)
    dispatch(addAnecdoteToState(newAnecdote))
  }
}

export const addVote = (anecdote) => {
  return async dispatch => {
    await anecdoteService.updateAnecdote(anecdote)
    dispatch(voteAnecdote(anecdote.id))
  }
}

export const {
  voteAnecdote,
  addAnecdoteToState,
  setAnecdotes
} = anecdoteSlice.actions

export default anecdoteSlice.reducer