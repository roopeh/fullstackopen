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

export default Notification
