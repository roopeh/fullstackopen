import { useState } from "react"
import PropTypes from "prop-types"

const BlogForm = ({
  createBlogFunction,
  cancelBlogFunction,
}) => {
  const [blogValues, setBlogValues] = useState({
    title: "",
    author: "",
    url: "",
  })

  const { author, title, url } = blogValues

  const createBlog = (event) => {
    event.preventDefault()
    createBlogFunction({
      url: blogValues.url,
      title: blogValues.title,
      author: blogValues.author,
    })

    setBlogValues({
      url: "",
      title: "",
      author: "",
    })
  }

  return (
    <div>
      <h2>Create new blog post</h2>
      <form onSubmit={createBlog}>
        <table>
          <tbody>
            <tr>
              <td>Title:</td>
              <td><input type="text" id="blogTitle" value={title} placeholder="Title" onChange={({ target }) => setBlogValues({ ...blogValues, title: target.value })} /></td>
            </tr>
            <tr>
              <td>Author:</td>
              <td><input type="text" id="blogAuthor" value={author} placeholder="Author" onChange={({ target }) => setBlogValues({ ...blogValues, author: target.value })} /></td>
            </tr>
            <tr>
              <td>Url:</td>
              <td><input type="text" id="blogUrl" value={url} placeholder="Url" onChange={({ target }) => setBlogValues({ ...blogValues, url: target.value })} /></td>
            </tr>
            <tr>
              <td><button type="submit" id="createBlogButton">Create</button></td>
              <td><button type="button" onClick={cancelBlogFunction}>Cancel</button></td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlogFunction: PropTypes.func.isRequired,
  cancelBlogFunction: PropTypes.func.isRequired,
}

export default BlogForm
