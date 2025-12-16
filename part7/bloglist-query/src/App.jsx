import { useContext, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import AuthContext from './AuthContext'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogLists from './components/BlogLists'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'

const App = () => {
  const { user, logout, initializeUser } = useContext(AuthContext)

  useEffect(() => {
    initializeUser()
  }, [])

  return (
    <div>
      <Notification />
      {!user && <LoginForm />}

      {user && (
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged in</p>
          <p>
            <button onClick={logout}>logout</button>
          </p>
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
