import { createSlice } from "@reduxjs/toolkit"
import blogService from "../services/blogs"
import { createNotification } from "./notificatonReducer"

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    addBlogToState(state, action) {
      state.push(action.payload)
    },
    addVoteToBlog(state, action) {
      const id = action.payload
      const blogToUpdate = state.find((itr) => itr.id === id)
      const updatedBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 1 }
      return state.map((blog) => (blog.id === id ? updatedBlog : blog))
    },
    addCommentToBlog(state, action) {
      /* const id = action.payload
      const blogToUpdate = state.find((itr) => itr.id === id)
      const updatedBlog = { ...blogToUpdate, comments: } */
      const updatedBlog = action.payload
      return state.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
    },
    removeBlogFromState(state, action) {
      const id = action.payload
      return state.filter((blog) => blog.id !== id)
    },
    sortBlogs(state) {
      state.sort((a, b) => b.likes - a.likes)
    },
  },
})

export const {
  setBlogs,
  addBlogToState,
  addVoteToBlog,
  addCommentToBlog,
  removeBlogFromState,
  sortBlogs,
} = blogSlice.actions

export const initializeBlogs = () => async (dispatch) => {
  const blogs = await blogService.getAll()
  dispatch(setBlogs(blogs))
  dispatch(sortBlogs())
}

export const createBlog = (blogObject) => async (dispatch) => {
  try {
    const newBlog = await blogService.createBlog(blogObject)
    dispatch(addBlogToState(newBlog))
    dispatch(sortBlogs())
    dispatch(createNotification(`A new blog ${newBlog.title} by ${newBlog.author} added`, false))
  } catch (exception) {
    dispatch(createNotification(`Blog creation failed: ${exception.response.data.error}`, true))
  }
}

export const voteBlog = (blogObject) => async (dispatch) => {
  try {
    const updatedBlog = await blogService.updateBlog(blogObject)
    dispatch(addVoteToBlog(updatedBlog.id))
    dispatch(sortBlogs())
  } catch (exception) {
    dispatch(createNotification(`Blog update failed: ${exception.response.data.error}`, true))
  }
}

export const commentBlog = (id, text) => async (dispatch) => {
  try {
    const updatedBlog = await blogService.commentBlog(
      id,
      { comment: text },
    )
    dispatch(addCommentToBlog(updatedBlog))
    dispatch(sortBlogs())
  } catch (exception) {
    dispatch(createNotification(`Blog update failed: ${exception.response.data.error}`, true))
  }
}

export const removeBlog = (id) => async (dispatch) => {
  try {
    await blogService.removeBlog(id)
  } catch (exception) {
    // No error notification, just remove blog from frontend
  }

  dispatch(removeBlogFromState(id))
  dispatch(sortBlogs())
}

export default blogSlice.reducer
