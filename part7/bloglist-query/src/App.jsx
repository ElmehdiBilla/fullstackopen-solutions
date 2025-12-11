import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import NotificationContext from './NotificationContext'
import { useContext } from 'react'

const App = () => {
  const { setNotification } = useContext(NotificationContext)
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      setBlogs([...blogs].sort((bA, bB) => bB.likes - bA.likes))
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const addBlog = async (blog) => {
    blogFormRef.current.toggleVisibility()
    try {
      const returnedBlog = await blogService.create(blog)
      /*
        we add the username to the returned blog
        because the backend (POST) only return the id of the user
        and the user logged does not have id field
    */
      returnedBlog.user = {
        username: user.username,
        name: user.name,
      }
      setBlogs(blogs.concat(returnedBlog))
      setNotification(`a new blog ${returnedBlog.title} added`)
    } catch (error) {
      setNotification(error.response.data.error, true)
    }
  }

  const handleUpdate = async (blog) => {
    try {
      const returnedBlog = await blogService.update(blog.id, blog)
      setBlogs(blogs.map((b) => (b.id === returnedBlog.id ? returnedBlog : b)))
      setNotification('the blog likes is updated')
    } catch (error) {
      setNotification(error.response.data.error, true)
    }
  }

  const handleDelete = async (id) => {
    try {
      await blogService.deleteBlog(id)
      setBlogs(blogs.filter((b) => b.id !== id))
      setNotification('the blog is deleted')
    } catch (error) {
      setNotification(error.response.data.error, true)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setNotification(error.response.data.error, true)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    window.location.reload()
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

  const blogForm = () => (
    <Togglable buttonLabel="create new blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
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
          {blogForm()}
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              updateBlog={handleUpdate}
              deleteBlog={
                user?.username === blog?.user?.username ? handleDelete : null
              }
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
