import { useRef, useState, useContext } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'
import NotificationContext from '../NotificationContext'
import Togglable from './Togglable'
import { Button, Typography, TextField, Box } from '@mui/material'

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
      <Box
        component="form"
        onSubmit={addBlog}
        sx={{
          maxWidth: 400,
          marginBlock: 4,
        }}
      >
        <Typography variant="h5">create new blogs</Typography>
        <TextField
          label="Title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          fullWidth
          size="small"
          margin="normal"
        />
        <TextField
          label="Author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
          fullWidth
          size="small"
          margin="normal"
        />
        <TextField
          label="Url"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
          fullWidth
          size="small"
          margin="normal"
        />
        <Button type="submit" variant="contained">
          create
        </Button>
      </Box>
    </Togglable>
  )
}

export default BlogForm
