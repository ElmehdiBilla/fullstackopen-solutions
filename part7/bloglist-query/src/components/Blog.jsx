import { useContext } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useMatch } from 'react-router-dom'
import blogService from '../services/blogs'
import NotificationContext from '../NotificationContext'
import AuthContext from '../AuthContext'

const Blog = () => {
  const match = useMatch('/blogs/:id')
  const queryClient = useQueryClient()
  const { setNotification } = useContext(NotificationContext)
  const { user } = useContext(AuthContext)

  const { isPending, isError, data } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    retry: false,
  })

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

  if (isPending) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>blogs service not available due to problems in server</span>
  }

  const blog = match ? data.find((u) => u.id === match.params.id) : null
  const canBeDeleted = user?.username === blog?.user?.username ? true : false

  if (!blog) {
    return null
  }

  const handleLike = () => {
    likesMutation.mutate({ ...blog, likes: blog.likes + 1 })
  }

  const handleDelete = () => {
    if (window.confirm(`remove ${blog.title} by ${blog.author}`)) {
      deleteMutation.mutate(blog.id)
    }
  }

  const deleteBtn = {
    backgroundColor: '#f55',
    borderColor: '#f00',
    borderRadius: 3,
    borderWidth: 1,
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
