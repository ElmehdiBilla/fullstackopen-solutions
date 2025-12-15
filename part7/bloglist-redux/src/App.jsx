import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Notification from './components/Notification'
import { initializeUser, logout } from './reducers/authReducer'
import LoginForm from './components/LoginForm'
import BlogLists from './components/BlogLists'
import Users from './components/Users'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(initializeUser())
  }, [])

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div>
      <Notification />
      {!user && <LoginForm />}

      {user && (
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged in</p>
          <p>
            <button onClick={handleLogout}>logout</button>
          </p>
          <Routes>
            <Route path="/" element={<BlogLists />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </div>
      )}
    </div>
  )
}

export default App
