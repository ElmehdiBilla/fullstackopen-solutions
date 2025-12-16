import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMatch } from 'react-router-dom'
import { deleteBlog, initializeBlogs, likeBlog } from '../reducers/blogReducer'

const Blog = () => {
  const match = useMatch('/blogs/:id')
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const blogs = useSelector((state) => state.blogs)
  const blog = match ? blogs.find((b) => b.id === match.params.id) : null
  const canBeDeleted = user?.username === blog?.user?.username ? true : false

  useEffect(() => {
    if (blogs.length === 0) {
      dispatch(initializeBlogs())
    }
  }, [dispatch, blogs.length])

  if (!blog) {
    return null
  }

  const deleteBtn = {
    backgroundColor: '#f55',
    borderColor: '#f00',
    borderRadius: 3,
    borderWidth: 1,
  }

  const handleLike = () => {
    dispatch(likeBlog(blog.id, { ...blog, likes: blog.likes + 1 }))
  }

  const handleDelete = () => {
    if (window.confirm(`remove ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog.id))
    }
  }

  return (
    <div className="blog">
      <h2 className="blog-title">{blog.title}</h2>
      <div>
        <a className="blog-url" href={blog.url}>
          {blog.url}
        </a>
        <div className="blog-likes">
          likes {blog.likes}
          &nbsp;
          <button onClick={handleLike}>like</button>
        </div>
        <div className="blog-author">{blog.author}</div>
        {canBeDeleted && (
          <button style={deleteBtn} onClick={handleDelete}>
            delete
          </button>
        )}
      </div>
    </div>
  )
}

export default Blog
