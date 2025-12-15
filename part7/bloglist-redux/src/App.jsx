import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import BlogForm from './components/BlogForm'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser, login, logout } from './reducers/authReducer'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUser())
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(login({ username, password }))
    setUsername('')
    setPassword('')
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>log in to application</h2>
      <div>
        <label>
          username
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
      </div>
      <button type="submit">login</button>
    </form>
  )

  return (
    <div>
      <Notification />

      {!user && loginForm()}

      {user && (
        <div>
          <h2>blogs</h2>
          <p>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </p>
          <BlogForm />
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              canBeDeleted={
                user?.username === blog?.user?.username ? true : false
              }
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
