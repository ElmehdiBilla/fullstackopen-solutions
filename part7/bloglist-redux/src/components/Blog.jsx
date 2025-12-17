import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMatch } from 'react-router-dom'
import { addComment, deleteBlog, initializeBlogs, likeBlog } from '../reducers/blogReducer'
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  TextField,
  Stack,
} from '@mui/material'
import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import AddCommentRoundedIcon from '@mui/icons-material/AddCommentRounded'

const Blog = () => {
  const match = useMatch('/blogs/:id')
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const blogs = useSelector((state) => state.blogs)
  const blog = match ? blogs.find((b) => b.id === match.params.id) : null
  const canBeDeleted = user?.username === blog?.user?.username ? true : false
  const [newComment, setNewComment] = useState('')

  useEffect(() => {
    if (blogs.length === 0) {
      dispatch(initializeBlogs())
    }
  }, [dispatch, blogs.length])

  if (!blog) {
    return null
  }

  const handleLike = () => {
    dispatch(likeBlog(blog.id, { ...blog, likes: blog.likes + 1 }))
  }

  const handleDelete = () => {
    if (window.confirm(`remove ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog.id))
    }
  }

  const handleComment = (e) => {
    e.preventDefault()
    if (newComment) {
      dispatch(
        addComment({
          id: blog.id,
          comment: newComment,
        }),
      )
    }
  }

  return (
    <Box>
      <Card className="blog" variant="outlined">
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            className="blog-title"
          >
            {blog.title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            <a className="blog-url" href={blog.url}>
              {blog.url}
            </a>
          </Typography>
          <div>
            <Typography
              className="blog-likes"
              variant="body2"
              sx={{ color: 'text.secondary' }}
            >
              likes {blog.likes}
            </Typography>
          </div>
          <div>
            <Typography
              className="blog-author"
              variant="body2"
              sx={{ color: 'text.secondary' }}
            >
              {blog.author}
            </Typography>
          </div>
        </CardContent>
        <CardActions>
          <Button
            startIcon={<ThumbUpRoundedIcon />}
            size="small"
            variant="outlined"
            onClick={handleLike}
          >
            like
          </Button>
          {canBeDeleted && (
            <Button
              startIcon={<DeleteRoundedIcon />}
              size="small"
              variant="outlined"
              color="error"
              onClick={handleDelete}
            >
              Delete
            </Button>
          )}
        </CardActions>
      </Card>

      <Typography variant="h6" marginBlock={2}>
        comments
      </Typography>

      <Box component="form" onSubmit={handleComment}>
        <Stack direction="row" spacing={2}>
          <TextField
            label="Comment"
            value={newComment}
            onChange={({ target }) => setNewComment(target.value)}
            fullWidth
            size="small"
            margin="normal"
            required
            sx={{ maxWidth: 360 }}
          />
          <Button startIcon={<AddCommentRoundedIcon/>} variant="outlined" type="submit">
            add comment
          </Button>
        </Stack>
      </Box>

      <List>
        {blog.comments.map((comment) => (
          <ListItem
            key={comment}
            sx={{
              borderBottom: '1px solid #ddd',
            }}
          >
            <ListItemText
              sx={{ color: 'text.secondary' }}
              primary={comment}
            ></ListItemText>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default Blog
