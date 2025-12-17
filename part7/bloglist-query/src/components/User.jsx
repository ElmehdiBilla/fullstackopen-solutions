import { useMatch } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import usersService from '../services/users'
import {
  Paper,
  Alert,
  Typography,
  List,
  ListItem,
  ListItemText,
} from '@mui/material'

const User = () => {
  const match = useMatch('/users/:id')

  const { isPending, isError, data } = useQuery({
    queryKey: ['users'],
    queryFn: usersService.getAll,
    retry: false,
  })

  if (isPending) {
    return <Typography sx={{ marginBlock: 2 }}>Loading...</Typography>
  }

  if (isError) {
    return (
      <Alert sx={{ marginBlock: 2 }} severity="error">
        Users service not available due to problems in server
      </Alert>
    )
  }

  const user = match ? data.find((u) => u.id === match.params.id) : null

  if (!user) {
    return null
  }

  return (
    <Paper variant="outlined" sx={{ padding: 4, marginTop: 4 }}>
      <Typography variant="h4">{user.name}</Typography>
      <Typography variant="h6" marginTop={2}>added blogs</Typography>
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
