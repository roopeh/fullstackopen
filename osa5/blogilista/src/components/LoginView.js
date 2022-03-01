import { useState } from "react"
import PropTypes from "prop-types"
import Notification from "./Notification"

const LoginView = ({
  notification,
  loginFunction,
}) => {
  const [loginCredentials, setLoginCredentials] = useState({
    username: "",
    password: "",
  })

  const login = (event) => {
    event.preventDefault()
    loginFunction({
      username: loginCredentials.username,
      password: loginCredentials.password,
    })

    setLoginCredentials({
      username: "",
      password: "",
    })
  }

  return (
    <div>
      <h2>Login to application</h2>
      <Notification message={notification.message} type={notification.type} />
      <form onSubmit={login}>
        <table>
          <tbody>
            <tr>
              <td>Username</td>
              <td><input type="text" id="username" value={loginCredentials.username} onChange={({ target }) => setLoginCredentials({ ...loginCredentials, username: target.value })} /></td>
            </tr>
            <tr>
              <td>Password</td>
              <td><input type="password" id="password" value={loginCredentials.password} onChange={({ target }) => setLoginCredentials({ ...loginCredentials, password: target.value })} /></td>
            </tr>
            <tr>
              <td />
              <td><button id="loginButton" type="submit">Login</button></td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  )
}

LoginView.propTypes = {
  notification: PropTypes.shape({
    message: PropTypes.string.isRequired,
    type: PropTypes.number.isRequired,
  }).isRequired,
  loginFunction: PropTypes.func.isRequired,
}

export default LoginView
