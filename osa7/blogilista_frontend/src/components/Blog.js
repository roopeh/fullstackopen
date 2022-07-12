import { useSelector, useDispatch } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
import { Table, Button } from "react-bootstrap"
import { useField } from "../hooks"
import { voteBlog, removeBlog, commentBlog } from "../reducers/blogReducer"

const Blog = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const commentInput = useField("text")
  const blogs = useSelector((state) => state.blogs)
  const blog = blogs.find((itr) => itr.id === id)

  if (!blog) {
    return "404 - blog not found"
  }

  const addLike = () => {
    dispatch(voteBlog({ ...blog, likes: blog.likes + 1, user: blog.user.id }))
  }

  const confirmRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      navigate("/")
      dispatch(removeBlog(blog.id))
    }
  }

  const addComment = async (event) => {
    event.preventDefault()
    try {
      dispatch(commentBlog(blog.id, commentInput.input.value))
    } catch (error) {
      console.log(error)
    }

    commentInput.reset()
  }

  return (
    <Table>
      <tbody>
        <tr>
          <td colSpan={2}><h2>{`${blog.title} ${blog.author}`}</h2></td>
        </tr>
        <tr>
          <td colSpan={2}><a href={`https://${blog.url}`}>{blog.url}</a></td>
        </tr>
        <tr>
          <td colSpan={2}>
            {`${blog.likes} likes `}
            <Button variant="primary" onClick={addLike}>like</Button>
          </td>
        </tr>
        <tr>
          <td colSpan={2}>{`added by ${blog.user.name}`}</td>
        </tr>
        <tr>
          <td colSpan={2}><Button variant="danger" onClick={confirmRemove}>delete</Button></td>
        </tr>
        <tr>
          <td colSpan={2}><h3>comments</h3></td>
        </tr>
        <tr>
          <td>
            <input {...commentInput.input} />
          </td>
          <td style={{ width: "70%" }}>
            <Button vairant="info" onClick={addComment}>add comment</Button>
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
            <Table bordered style={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}>
              <tbody>
                {blog.comments.map((comment) => (
                  <tr key={comment}><td>{comment}</td></tr>
                ))}
              </tbody>
            </Table>
          </td>
        </tr>
      </tbody>
    </Table>
  )
}

export default Blog
