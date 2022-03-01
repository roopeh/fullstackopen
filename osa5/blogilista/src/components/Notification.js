import PropTypes from "prop-types"

const Notification = ({ message, type }) => {
  if (!message) {
    return null
  }

  const typeString = type === 1 ? "error" : "notification"

  return (
    <div className={typeString}>
      {message}
    </div>
  )
}

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.number.isRequired,
}

export default Notification
