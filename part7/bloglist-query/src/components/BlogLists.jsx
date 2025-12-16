import BlogForm from './BlogForm'
import blogService from '../services/blogs'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

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

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    borderRadius: 3,
    marginTop: 5,
    marginBottom: 5,
  }

  const blogs = data.sort((bA, bB) => bB.likes - bA.likes)

  return (
    <div>
      <BlogForm />
      {blogs.map((blog) => (
        <div style={blogStyle} key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </div>
      ))}
    </div>
  )
}

export default BlogLists
