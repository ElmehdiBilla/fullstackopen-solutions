import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Notification from './components/Notification'
import { initializeUser } from './reducers/authReducer'
import LoginForm from './components/LoginForm'
import BlogLists from './components/BlogLists'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'
import Menu from './components/Menu'
import { Container, Typography } from '@mui/material'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(initializeUser())
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
