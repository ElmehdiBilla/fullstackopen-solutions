import { useState } from 'react'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)

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
            <button>like</button>
          </div>
          <div className="blog-author">{blog.author}</div>
        </div>
      )}
    </div>
  )
}

export default Blog
