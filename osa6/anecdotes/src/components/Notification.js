import { connect } from "react-redux"

const Notification = (props) => {
  //const notification = useSelector(state => state.notifications)
  const notification = props.text

  if (!notification)
    return null

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

const stateToProps = (state) => {
  return {
    text: state.notifications
  }
}

const ConnectedNotifications = connect(stateToProps)(Notification)
export default ConnectedNotifications