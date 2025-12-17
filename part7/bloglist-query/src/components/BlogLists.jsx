import BlogForm from './BlogForm'
import blogService from '../services/blogs'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { List, ListItem, ListItemText } from '@mui/material'

function BlogLists() {
  const { isPending, isError, data } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    retry: false,
  })

  if (isPending) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>blogs service not available due to problems in server</span>
  }

  const blogs = data.sort((bA, bB) => bB.likes - bA.likes)

  return (
    <div>
      <BlogForm />
      <List>
        {blogs.map((blog) => (
          <ListItem
            key={blog.id}
            component={Link}
            to={`/blogs/${blog.id}`}
            sx={{
              borderBottom: '1px solid #ddd',
            }}
            button="true"
          >
            <ListItemText primary={blog.title} secondary={blog.author} />
          </ListItem>
        ))}
      </List>
    </div>
  )
}

export default BlogLists
