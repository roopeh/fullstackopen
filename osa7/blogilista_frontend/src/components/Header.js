import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"
import { Navbar, Nav, Container } from "react-bootstrap"
import Notification from "./Notification"

const Header = ({ logoutFunction }) => {
  const user = useSelector((state) => state.user)

  const appTitle = "blog app"

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Nav className="me-auto">
            <Nav.Link href="#" as="span">
              <Link to="/">blogs</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link to="/users">users</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              {user
                ? <Link to="/" onClick={logoutFunction}>logout</Link>
                : <Link to="/login">login</Link> }
            </Nav.Link>
            {user
              ? (
                <Navbar.Collapse className="justify-content-end">
                  <Navbar.Text>
                    {` ${user.name} logged in `}
                  </Navbar.Text>
                </Navbar.Collapse>
              )
              : null }
          </Nav>
        </Container>
      </Navbar>
      <h2>{appTitle}</h2>
      <Notification />
    </div>
  )
}

Header.propTypes = {
  logoutFunction: PropTypes.func.isRequired,
}

export default Header
