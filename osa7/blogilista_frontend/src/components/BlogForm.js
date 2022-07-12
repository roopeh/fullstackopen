import { useDispatch } from "react-redux"
import PropTypes from "prop-types"
import { Table, Button } from "react-bootstrap"
import { createBlog } from "../reducers/blogReducer"
import { useField } from "../hooks"

const BlogForm = ({ cancelBlogFunction }) => {
  const titleInput = useField("text")
  const authorInput = useField("text")
  const urlInput = useField("text")

  const dispatch = useDispatch()

  const createBlogFunction = (event) => {
    event.preventDefault()
    dispatch(createBlog({
      url: urlInput.input.value,
      title: titleInput.input.value,
      author: authorInput.input.value,
    }))

    urlInput.reset()
    titleInput.reset()
    authorInput.reset()
  }

  return (
    <form onSubmit={createBlogFunction}>
      <Table>
        <tbody>
          <tr>
            <td colSpan={2}>
              <h2>Create new blog post</h2>
            </td>
          </tr>
          <tr>
            <td>Title:</td>
            <td className="blogFormColumn"><input placeholder="Title" {...titleInput.input} /></td>
          </tr>
          <tr>
            <td>Author:</td>
            <td className="blogFormColumn"><input placeholder="Author" {...authorInput.input} /></td>
          </tr>
          <tr>
            <td>Url:</td>
            <td className="blogFormColumn"><input placeholder="Url" {...urlInput.input} /></td>
          </tr>
          <tr>
            <td colSpan={2}>
              <Button variant="primary" id="createBlogButton">Create</Button>
              {" "}
              <Button variant="secondary" onClick={cancelBlogFunction}>Cancel</Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </form>
  )
}

BlogForm.propTypes = {
  cancelBlogFunction: PropTypes.func.isRequired,
}

export default BlogForm
