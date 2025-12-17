import { useContext, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import AuthContext from './AuthContext'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogLists from './components/BlogLists'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'
import Menu from './components/Menu'
import { Container, Typography } from '@mui/material'


const App = () => {
  const { user, initializeUser } = useContext(AuthContext)

  useEffect(() => {
    initializeUser()
  }, [])

  return (
    <Container>
      {user && <Menu />}
      <Notification />
      {!user && <LoginForm />}
      {user && (
        <div>
          <Typography variant="h2">blog app</Typography>
          <Routes>
            <Route path="/" element={<BlogLists />} />
            <Route path="/blogs/:id" element={<Blog />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<User />} />
          </Routes>
        </div>
      )}
    </Container>
  )
}

export default App
