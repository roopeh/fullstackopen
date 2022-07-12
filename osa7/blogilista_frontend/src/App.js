/* eslint-disable react/jsx-first-prop-new-line */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import BlogView from "./components/BlogView"
import Blog from "./components/Blog"
import LoginView from "./components/LoginView"
import User from "./components/User"
import Users from "./components/Users"
import blogService from "./services/blogs"
import loginService from "./services/login"
import { createNotification } from "./reducers/notificatonReducer"
import { initializeBlogs } from "./reducers/blogReducer"
import { setUser, userLogout } from "./reducers/userReducer"
import Header from "./components/Header"
import { initializeUsers } from "./reducers/usersReducer"

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const userJson = window.localStorage.getItem("loggedBlogUser")
    if (userJson) {
      const parsedUser = JSON.parse(userJson)
      dispatch(setUser(parsedUser))
      blogService.setToken(parsedUser.token)
    }
  }, [])

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  // Test user, FooBar : 321321
  // Test user, BarFoo : 123
  const handleLogin = async (credentials) => {
    try {
      const userData = await loginService.login(credentials)
      dispatch(setUser(userData))
      blogService.setToken(userData.token)
      window.localStorage.setItem("loggedBlogUser", JSON.stringify(userData))
      dispatch(createNotification(`Welcome ${userData.name}!`, false))
    } catch (exception) {
      dispatch(createNotification("Invalid username or password", true))
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    window.localStorage.removeItem("loggedBlogUser")
    dispatch(userLogout())
    dispatch(createNotification("Logged out", false))
  }

  return (
    <div className="container">
      <Router>
        <Header logoutFunction={handleLogout} />

        <Routes>
          <Route path="/" element={<BlogView />} />
          <Route path="/blogs/:id" element={<Blog />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/login" element={<LoginView loginFunction={handleLogin} />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
