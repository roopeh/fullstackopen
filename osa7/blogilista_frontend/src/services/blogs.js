import axios from "axios"

const baseUrl = "/api/blogs"
let token = ""

const setToken = (userToken) => {
  token = `bearer ${userToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createBlog = async (newBlog) => {
  const headerConfig = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newBlog, headerConfig)
  return response.data
}

const updateBlog = async (blog) => {
  const headerConfig = {
    headers: { Authorization: token },
  }

  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, headerConfig)
  return response.data
}

const removeBlog = async (blogId) => {
  const headerConfig = {
    headers: { Authorization: token },
  }

  const response = await axios.delete(`${baseUrl}/${blogId}`, headerConfig)
  return response.data
}

const commentBlog = async (blogId, text) => {
  const headerConfig = {
    headers: { Authorization: token },
  }

  const response = await axios.post(`${baseUrl}/${blogId}/comments`, text, headerConfig)
  return response.data
}

const exportedBlogs = {
  setToken,
  getAll,
  createBlog,
  updateBlog,
  removeBlog,
  commentBlog,
}
export default exportedBlogs
