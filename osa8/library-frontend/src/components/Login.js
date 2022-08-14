import { useEffect, useState } from "react"
import { useMutation } from "@apollo/client"
import Queries from "../graphql/queries"

const Login = ({ show, successLogin, sendError }) => {
  if (!show) {
    return null
  }

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [loginFunc, loginResult] = useMutation(Queries.Login, {
    onError: (error) => sendError(error.graphQLErrors[0].message),
  })

  useEffect(() => {
    if (loginResult.data) {
      const token = loginResult.data.login.value
      localStorage.setItem("libraryApp-user-token", token)
      successLogin(token)
    }
  }, [loginResult.data])

  const login = (event) => {
    event.preventDefault()
    loginFunc({ variables: { username, password } })
    setUsername("")
    setPassword("")
  }

  return (
    <div>
      <h2>login</h2>
      <form onSubmit={login}>
        <table>
          <tbody>
            <tr>
              <td>username</td>
              <td><input type="text" value={username} onChange={({ target }) => setUsername(target.value)} /></td>
            </tr>
            <tr>
              <td>password</td>
              <td><input type="password" value={password} onChange={({ target }) => setPassword(target.value)} /></td>
            </tr>
            <tr>
              <td> </td>
              <td><button type="submit">login</button></td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  )
}

export default Login
