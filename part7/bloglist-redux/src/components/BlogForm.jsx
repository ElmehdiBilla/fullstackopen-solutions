import { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import Togglable from './Togglable'
import { Button, Typography, TextField, Box } from '@mui/material'

const BlogForm = () => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const togglableRef = useRef()

  const addBlog = (event) => {
    event.preventDefault()
    dispatch(createBlog({ title, author, url }))
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
          marginBlock:4
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
