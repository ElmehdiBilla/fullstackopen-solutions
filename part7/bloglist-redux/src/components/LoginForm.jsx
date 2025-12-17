import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/authReducer'
import { Button, Typography, TextField, Box } from '@mui/material'

const LoginForm = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(login({ username, password }))
    setUsername('')
    setPassword('')
  }

  return (
    <Box
      component="form"
      onSubmit={handleLogin}
      sx={{
        maxWidth: 400,
        marginBlock: 4,
      }}
    >
      <Typography variant="h5">Log in to application</Typography>
      <TextField
        label="Username"
        value={username}
        onChange={({ target }) => setUsername(target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Password"
        value={password}
        onChange={({ target }) => setPassword(target.value)}
        fullWidth
        margin="normal"
      />
      <Button type='submit'  variant="contained" size="large">
        login
      </Button>
    </Box>
  )
}

export default LoginForm
