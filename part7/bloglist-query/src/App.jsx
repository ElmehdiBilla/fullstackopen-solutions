import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import BlogForm from './components/BlogForm'
import AuthContext from './authContext'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { user, login, logout, initializeUser } = useContext(AuthContext)

  const { isPending, isError, data } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    retry: false,
  })

  useEffect(() => {
    initializeUser()
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    login({ username, password })
    setUsername('')
    setPassword('')
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

  if (isPending) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>blogs service not available due to problems in server</span>
  }

  const blogs = data.sort((bA, bB) => bB.likes - bA.likes)

  return (
    <div>
      <Notification />

      {!user && loginForm()}

      {user && (
        <div>
          <h2>blogs</h2>
          <p>
            {user.name} logged in <button onClick={logout}>logout</button>
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
