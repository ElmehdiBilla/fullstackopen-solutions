import { useContext } from 'react'
import NotificationContext from '../NotificationContext'
import { Alert } from '@mui/material'

const Notification = () => {
  const { notification } = useContext(NotificationContext)
  const { message, isError } = notification

  if (!message) {
    return null
  }

  return (
    <Alert sx={{ marginBlock: 2 }} severity={isError ? 'error' : 'success'}>
      {message}
    </Alert>
  )
}

export default Notification
