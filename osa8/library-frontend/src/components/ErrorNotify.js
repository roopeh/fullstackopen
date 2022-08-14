const ErrorNotify = ({ message }) => {
  if (!message) {
    return null
  }

  return (
    <p style={{ color: "red" }}>
      {message}
    </p>
  )
}

export default ErrorNotify
