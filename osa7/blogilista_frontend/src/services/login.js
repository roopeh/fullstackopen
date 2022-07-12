import axios from "axios"

const apiUrl = "/api/login"

const login = async (credentials) => {
  const response = await axios.post(apiUrl, credentials)
  return response.data
}

const exportedObjects = { login }

export default exportedObjects
