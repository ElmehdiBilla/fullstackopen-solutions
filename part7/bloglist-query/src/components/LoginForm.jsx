import { useState, useContext } from 'react'
import AuthContext from "../AuthContext"
import { Button, Typography, TextField, Box } from '@mui/material'


const LoginForm = () => {
  const { login } = useContext(AuthContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    login({ username, password })
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
