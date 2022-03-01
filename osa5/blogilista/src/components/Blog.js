import { useState } from "react"
import PropTypes from "prop-types"

const Blog = ({
  blog,
  userid,
  updateBlogFunction,
  removeBlogFunction,
}) => {
  const [showData, setShowData] = useState(false)

  const addLike = () => {
    updateBlogFunction({ ...blog, likes: blog.likes + 1, user: blog.user.id })
  }

  const blogRemoveButtonStyle = { display: blog.user.id === userid ? "" : "none" }

  return (
    <div className="blogBlock">
      {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
      {blog.title} {blog.author}
      <button type="button" onClick={() => setShowData(!showData)}>
        {showData ? "Hide" : "View"}
      </button>
      <div className="blogData" style={{ display: showData ? "" : "none" }}>
        {blog.url}
        <br />
        {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
        Likes {blog.likes}
        <button type="button" onClick={addLike}>Like</button>
        <br />
        {blog.user.name}
        <br />
        <button type="button" onClick={() => removeBlogFunction(blog)} style={blogRemoveButtonStyle}>
          Remove
        </button>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  userid: PropTypes.string.isRequired,
  updateBlogFunction: PropTypes.func.isRequired,
  removeBlogFunction: PropTypes.func.isRequired,
}

export default Blog
