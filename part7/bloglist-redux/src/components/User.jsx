import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMatch, Link } from 'react-router-dom'
import { initializeUsers } from '../reducers/usersReducer'
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
} from '@mui/material'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded'

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
      <Typography variant="h4" display="flex" alignItems="center">
        <PersonRoundedIcon fontSize="large" />
        {user.name}
      </Typography>
      <Typography variant="h6" marginTop={2}>
        added blogs
      </Typography>
      <List>
        {user.blogs.map((blog) => (
          <ListItem
            key={blog.id}
            component={Link}
            to={`/blogs/${blog.id}`}
          >
            <ListItemText primary={blog.title} />
          </ListItem>
        ))}
      </List>
    </Paper>
  )
}

export default User
