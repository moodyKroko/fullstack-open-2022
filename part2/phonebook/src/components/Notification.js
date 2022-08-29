const Notification = ({ notifications }) => {
  if (notifications === null) {
    return null
  }

  const { message, type } = notifications

  const getNotificationType = () => {
    if (type === 'error') {
      return 'error'
    }

    if (type === 'success') {
      return 'success'
    }

    return null
  }

  return <div className={getNotificationType()}>{message}</div>
}

export default Notification
