import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext, useState } from 'react'
import blogService from '../services/blogs'
import NotificationContext from '../NotificationContext'

const Blog = ({ blog, canBeDeleted }) => {
  const queryClient = useQueryClient()
  const [visible, setVisible] = useState(false)
  const { setNotification } = useContext(NotificationContext)

  const likesMutation = useMutation({
    mutationFn: (blog) => {
      return blogService.update(blog.id, blog)
    },
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(
        ['blogs'],
        blogs.map((b) => (b.id === updatedBlog.id ? updatedBlog : b)),
      )
      setNotification('the blog likes is updated')
    },
    onError: (error) => {
      setNotification(error.response.data.error, true)
    },
  })

  const deleteMutation = useMutation({
    mutationFn: blogService.deleteBlog,
    onSuccess: () => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(
        ['blogs'],
        blogs.filter((b) => b.id !== blog.id),
      )
      setNotification('the blog is deleted')
    },
    onError: (error) => {
      setNotification(error.response.data.error, true)
    },
  })

  const handleLike = () => {
    likesMutation.mutate({ ...blog, likes: blog.likes + 1 })
  }

  const handleDelete = () => {
    if (window.confirm(`remove ${blog.title} by ${blog.author}`)) {
      deleteMutation.mutate(blog.id)
    }
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

  const deleteBtn = {
    backgroundColor: '#f55',
    borderColor: '#f00',
    borderRadius: 3,
    borderWidth: 1,
  }

  return (
    <div style={blogStyle} className="blog">
      <span className="blog-title">{blog.title}</span>
      <button onClick={() => setVisible(!visible)}>
        {visible ? 'hide' : 'view'}
      </button>
      {visible && (
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
      )}
    </div>
  )
}

export default Blog
