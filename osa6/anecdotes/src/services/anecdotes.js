import axios from "axios"
import { asObject } from "../reducers/anecdoteReducer"

const url = "http://localhost:3001/anecdotes"

const getAll = async () => {
  const response = await axios.get(url)
  return response.data
}

const saveAnecdote = async (anecdote) => {
  const response = await axios.post(url, asObject(anecdote))
  return response.data
}

const updateAnecdote = async (anecdote) => {
  const response = await axios.put(`${url}/${anecdote.id}`,
    { ...anecdote, votes: anecdote.votes + 1 })
  return response.data
}

const methods = {
  getAll,
  saveAnecdote,
  updateAnecdote
}

export default methods
