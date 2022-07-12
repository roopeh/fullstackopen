import { useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Table, Button } from "react-bootstrap"
import BlogForm from "./BlogForm"

const BlogView = () => {
  const [newBlogVisible, setNewBlogVisible] = useState(false)
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  return (
    <div>
      {!newBlogVisible
        ? (
          <div>
            <Button style={{ display: user ? "block" : "none" }} onClick={() => setNewBlogVisible(true)}>New blog</Button>
            <br />
          </div>
        )
        : <BlogForm cancelBlogFunction={() => setNewBlogVisible(false)} />}
      <Table striped hover>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </td>
              <td>
                {blog.author}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default BlogView
