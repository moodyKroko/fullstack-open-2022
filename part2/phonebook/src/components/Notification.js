const Notification = ({ message, messageType }) => {
  if (message === null) {
    return null
  }

  const getNotificationType = () => {
    if (messageType === 'error') {
      return 'error'
    }

    if (messageType === 'success') {
      return 'success'
    }

    return null
  }

  return <div className={getNotificationType()}>{message}</div>
}

export default Notification
