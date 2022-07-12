import { useSelector } from "react-redux"
import { useParams, Link } from "react-router-dom"
import { Table } from "react-bootstrap"

const User = () => {
  const { id } = useParams()
  const users = useSelector((state) => state.users)
  const user = users.find((itr) => itr.id === id)

  if (!user) {
    return null
  }

  return (
    <div>
      <h4>{`Blogs added by ${user.name}`}</h4>
      <Table striped hover>
        <tbody>
          {user.blogs.map((blog) => (
            <tr key={blog.id}><td><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></td></tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default User
