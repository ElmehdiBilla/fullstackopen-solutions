import { useSelector } from 'react-redux'
import { Alert } from '@mui/material'

const Notification = () => {
  const { message, isError } = useSelector((state) => state.notification)

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
