import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Table } from "react-bootstrap"

const Users = () => {
  const users = useSelector((state) => state.users)

  return (
    <div>
      <Table hover>
        <tbody>
          <tr>
            <td>User</td>
            <td>Blogs created</td>
          </tr>
          {users.map((user) => (
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Users
