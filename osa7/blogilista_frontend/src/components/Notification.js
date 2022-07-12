import { useSelector } from "react-redux"
import { Alert } from "react-bootstrap"

const Notification = () => {
  const notification = useSelector((state) => state.notifications)
  if (!notification || !notification.message) {
    return null
  }

  const typeString = notification.type ? "danger" : "success"

  return (
    <Alert variant={typeString}>
      {notification.message}
    </Alert>
  )
}

export default Notification
