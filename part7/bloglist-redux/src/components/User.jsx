import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMatch } from 'react-router-dom'
import { initializeUsers } from '../reducers/usersReducer'
import {
  Paper,
  Alert,
  Typography,
  List,
  ListItem,
  ListItemText,
} from '@mui/material'

const User = () => {
  const dispatch = useDispatch()
  const match = useMatch('/users/:id')
  const users = useSelector((state) => state.users)
  const user = match ? users.find((u) => u.id === match.params.id) : null

  useEffect(() => {
    if (users.length === 0) {
      dispatch(initializeUsers())
    }
  }, [dispatch, users.length])

  if (!user) {
    return null
  }

  return (
    <Paper variant="outlined" sx={{ padding: 4, marginTop: 4 }}>
      <Typography variant="h4">{user.name}</Typography>
      <Typography variant="h6" marginTop={2}>
        added blogs
      </Typography>
      <List>
        {user.blogs.map((blog) => (
          <ListItem key={blog.id}>
            <ListItemText primary={blog.title} />
          </ListItem>
        ))}
      </List>
    </Paper>
  )
}

export default User
