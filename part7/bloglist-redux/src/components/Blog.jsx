import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMatch } from 'react-router-dom'
import { addComment, deleteBlog, initializeBlogs, likeBlog } from '../reducers/blogReducer'

const Blog = () => {
  const match = useMatch('/blogs/:id')
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const blogs = useSelector((state) => state.blogs)
  const blog = match ? blogs.find((b) => b.id === match.params.id) : null
  const canBeDeleted = user?.username === blog?.user?.username ? true : false
  const [newComment, setNewComment] = useState('')

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

  const handleComment = (e) => {
    e.preventDefault()
    if (newComment) {
      dispatch(
        addComment({
          id: blog.id,
          comment: newComment,
        }),
      )
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
      <h3>comments</h3>
      <form onSubmit={handleComment}>
        <input
          type="text"
          value={newComment}
          onChange={({ target }) => setNewComment(target.value)}
          required
        />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default Blog
