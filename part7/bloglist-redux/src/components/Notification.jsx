import { useSelector } from 'react-redux'

const Notification = () => {
  const { message, isError } = useSelector((state) => state.notification)

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
