import { useRef, useState, useContext } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'
import NotificationContext from '../NotificationContext'
import Togglable from './Togglable'

const BlogForm = () => {
  const queryClient = useQueryClient()
  const { setNotification } = useContext(NotificationContext)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const togglableRef = useRef()

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.concat(newBlog))
      setNotification(`a new blog ${newBlog.title} added`)
    },
    onError: (error) => {
      setNotification(error.response.data.error, true)
    },
  })

  const addBlog = (event) => {
    event.preventDefault()
    newBlogMutation.mutate({ title, author, url })
    togglableRef.current.toggleVisibility()
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <Togglable buttonLabel="create new blog" ref={togglableRef}>
      <form onSubmit={addBlog}>
        <h2>create new blogs</h2>
        <div>
          <label>
            title
            <input
              type="text"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            author
            <input
              type="text"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            url
            <input
              type="text"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
          </label>
        </div>
        <button type="submit">create</button>
      </form>
    </Togglable>
  )
}

export default BlogForm
