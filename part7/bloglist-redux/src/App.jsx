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

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(initializeUser())
  }, [])

  return (
    <div>
      <Notification />
      {!user ? <LoginForm /> : <Menu />}
      {user && (
        <div>
          <h2>blog app</h2>
          <Routes>
            <Route path="/" element={<BlogLists />} />
            <Route path="/blogs/:id" element={<Blog />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<User />} />
          </Routes>
        </div>
      )}
    </div>
  )
}

export default App
