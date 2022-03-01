/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import { useState } from "react"
import PropTypes from "prop-types"
import Blog from "./Blog"
import BlogForm from "./BlogForm"
import Notification from "./Notification"

const BlogView = ({
  notification,
  user,
  blogs,
  logoutFunction,
  createBlogFunction,
  updateBlogFunction,
  removeBlogFunction,
}) => {
  const [newBlogVisible, setNewBlogVisible] = useState(false)

  const hideWhenVisible = { display: newBlogVisible ? "none" : "" }
  const showWhenVisible = { display: newBlogVisible ? "" : "none" }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notification.message} type={notification.type} />
      <p>
        {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
        {user.name} logged in
        <br />
        <button type="button" onClick={logoutFunction}>Logout</button>
        <br />
      </p>
      <div style={hideWhenVisible}>
        <button type="button" onClick={() => setNewBlogVisible(true)}>New blog</button>
      </div>
      <div style={showWhenVisible}>
        <BlogForm
          createBlogFunction={createBlogFunction}
          cancelBlogFunction={() => setNewBlogVisible(false)}
        />
        <br />
      </div>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          userid={user.id}
          updateBlogFunction={updateBlogFunction}
          removeBlogFunction={removeBlogFunction}
        />
      ))}
    </div>
  )
}

BlogView.propTypes = {
  notification: PropTypes.shape({
    message: PropTypes.string.isRequired,
    type: PropTypes.number.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  blogs: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })).isRequired,
  logoutFunction: PropTypes.func.isRequired,
  createBlogFunction: PropTypes.func.isRequired,
  updateBlogFunction: PropTypes.func.isRequired,
  removeBlogFunction: PropTypes.func.isRequired,
}

export default BlogView
