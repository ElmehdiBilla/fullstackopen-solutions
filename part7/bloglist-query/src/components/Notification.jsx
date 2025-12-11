import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

const Notification = () => {
  const { notification } = useContext(NotificationContext)
  const { message, isError } = notification

  if (!message) {
    return null
  }

  return (
    <div className={`notification ${isError ? 'error' : 'success'}`}>
      {message}
    </div>
  )
}

export default Notification
