/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import React, { useState, useEffect } from "react"
import BlogView from "./components/BlogView"
import LoginView from "./components/LoginView"
import blogService from "./services/blogs"
import loginService from "./services/login"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ message: "", type: 0 })

  useEffect(() => {
    const userJson = window.localStorage.getItem("loggedBlogUser")
    if (userJson) {
      const parsedUser = JSON.parse(userJson)
      setUser(parsedUser)
      blogService.setToken(parsedUser.token)
    }
  }, [])

  const handleBlogSort = (unsortedBlogs) => {
    const sortedBlogs = unsortedBlogs.sort((a, b) => b.likes - a.likes)
    setBlogs(sortedBlogs)
  }

  useEffect(() => {
    blogService.getAll().then((unsortedBlogs) => {
      handleBlogSort(unsortedBlogs)
    })
  }, [])

  const createNotification = (message, isError) => {
    setNotification({ message, type: isError ? 1 : 0 })
    setTimeout(() => setNotification({ message: "", type: 0 }), 3000)
  }

  // Test user, FooBar : 321321
  const handleLogin = async (credentials) => {
    try {
      const userData = await loginService.login(credentials)

      setUser(userData)
      window.localStorage.setItem("loggedBlogUser", JSON.stringify(userData))
      createNotification(`Welcome ${userData.name}!`, false)
    } catch (exception) {
      createNotification("Invalid username or password", true)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    window.localStorage.removeItem("loggedBlogUser")
    setUser(null)
    createNotification("Logged out", false)
  }

  const handleCreateBlog = async (blogObject) => {
    try {
      const newBlog = await blogService.createBlog(blogObject)
      handleBlogSort([...blogs, newBlog])
      createNotification(`A new blog ${newBlog.title} by ${newBlog.author} added`, false)
    } catch (exception) {
      createNotification(`Blog creation failed: ${exception.response.data.error}`, true)
    }
  }

  const handleUpdateBlog = async (blogObject) => {
    try {
      await blogService.updateBlog(blogObject)
      handleBlogSort(await blogService.getAll())
    } catch (exception) {
      createNotification(`Blog update failed: ${exception.response.data.error}`, true)
    }
  }

  const handleRemoveBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        await blogService.removeBlog(blog.id)
      } catch (exception) {
        // No error notification, just remove blog from frontend
      }
      handleBlogSort(blogs.filter((itr) => itr.id !== blog.id))
    }
  }

  if (user === null) {
    return (
      <LoginView
        loginFunction={handleLogin}
        notification={notification}
      />
    )
  }

  return (
    <BlogView
      user={user}
      blogs={blogs}
      createBlogFunction={handleCreateBlog}
      updateBlogFunction={handleUpdateBlog}
      removeBlogFunction={handleRemoveBlog}
      logoutFunction={handleLogout}
      notification={notification}
    />
  )
}

export default App
