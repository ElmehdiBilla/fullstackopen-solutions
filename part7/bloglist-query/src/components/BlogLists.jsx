import Blog from './Blog'
import BlogForm from './BlogForm'
import blogService from '../services/blogs'
import AuthContext from '../authContext'
import { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'

function BlogLists() {
  const { user } = useContext(AuthContext)

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
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          canBeDeleted={user?.username === blog?.user?.username ? true : false}
        />
      ))}
    </div>
  )
}

export default BlogLists
