const Notification = ({ message, color = 'green' }) => {
  if (!message) {
    return null
  }

  const redColorNotificationStyles = {
    color
  }

  return (
    <div className='error' style={redColorNotificationStyles}>
      {message}
    </div>
  )
}

export default Notification
