import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from '../reducers/blogReducer'
import BlogForm from './BlogForm'
import { Link } from 'react-router-dom'
import { List, ListItem, ListItemText } from '@mui/material'

function BlogLists() {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

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
