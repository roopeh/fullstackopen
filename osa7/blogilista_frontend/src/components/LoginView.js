import PropTypes from "prop-types"
import { Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import Notification from "./Notification"
import { useField } from "../hooks"

const LoginView = ({ loginFunction }) => {
  const username = useField("text")
  const password = useField("password")
  const navigate = useNavigate()

  const login = (event) => {
    event.preventDefault()
    loginFunction({
      username: username.input.value,
      password: password.input.value,
    })

    username.reset()
    password.reset()
    navigate("/")
  }

  return (
    <div>
      <h2>Login to application</h2>
      <form onSubmit={login}>
        <table>
          <tbody>
            <tr>
              <td>Username</td>
              <td><input {...username.input} /></td>
            </tr>
            <tr>
              <td>Password</td>
              <td><input {...password.input} /></td>
            </tr>
            <tr>
              <td />
              <td><Button id="loginButton" variant="primary" type="submit">Login</Button></td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  )
}

LoginView.propTypes = {
  loginFunction: PropTypes.func.isRequired,
}

export default LoginView
