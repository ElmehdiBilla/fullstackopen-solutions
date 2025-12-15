import { useContext, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import AuthContext from './authContext'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogLists from './components/BlogLists'
import Users from './components/Users'

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
            <Route path="/users" element={<Users />} />
          </Routes>
        </div>
      )}
    </div>
  )
}

export default App
