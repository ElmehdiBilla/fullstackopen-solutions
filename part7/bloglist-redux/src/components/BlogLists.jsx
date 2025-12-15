import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from '../reducers/blogReducer'
import Blog from './Blog'
import BlogForm from './BlogForm'

function BlogLists() {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

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
