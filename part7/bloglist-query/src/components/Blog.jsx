import { useContext } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useMatch } from 'react-router-dom'
import blogService from '../services/blogs'
import NotificationContext from '../NotificationContext'
import AuthContext from '../AuthContext'
import { useState } from 'react'
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
  const queryClient = useQueryClient()
  const { setNotification } = useContext(NotificationContext)
  const { user } = useContext(AuthContext)
  const [newComment, setNewComment] = useState('')

  const { isPending, isError, data } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    retry: false,
  })

  const likesMutation = useMutation({
    mutationFn: (blog) => {
      return blogService.update(blog.id, blog)
    },
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(
        ['blogs'],
        blogs.map((b) => (b.id === updatedBlog.id ? updatedBlog : b)),
      )
      setNotification('the blog likes is updated')
    },
    onError: (error) => {
      setNotification(error.response.data.error, true)
    },
  })

  const deleteMutation = useMutation({
    mutationFn: blogService.deleteBlog,
    onSuccess: () => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(
        ['blogs'],
        blogs.filter((b) => b.id !== blog.id),
      )
      setNotification('the blog is deleted')
    },
    onError: (error) => {
      setNotification(error.response.data.error, true)
    },
  })

  const commentMutation = useMutation({
    mutationFn: ({ id, comment }) => {
      return blogService.comment(id, { comment })
    },
    onSuccess: (blog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(
        ['blogs'],
        blogs.map((b) => (b.id === blog.id ? blog : b)),
      )
      setNotification('the comment is added')
    },
    onError: (error) => {
      setNotification(error.response.data.error, true)
    },
  })

  if (isPending) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>blogs service not available due to problems in server</span>
  }

  const blog = match ? data.find((u) => u.id === match.params.id) : null
  const canBeDeleted = user?.username === blog?.user?.username ? true : false

  if (!blog) {
    return null
  }

  const handleLike = () => {
    likesMutation.mutate({ ...blog, likes: blog.likes + 1 })
  }

  const handleDelete = () => {
    if (window.confirm(`remove ${blog.title} by ${blog.author}`)) {
      deleteMutation.mutate(blog.id)
    }
  }

  const handleComment = (e) => {
    e.preventDefault()
    if (newComment) {
      commentMutation.mutate({
        id: blog.id,
        comment: newComment,
      })
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
          <Button
            startIcon={<AddCommentRoundedIcon />}
            variant="outlined"
            type="submit"
          >
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
