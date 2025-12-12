import { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import Togglable from './Togglable'

const BlogForm = () => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const togglableRef = useRef()

  const addBlog = (event) => {
    event.preventDefault()
    dispatch(createBlog({ title, author, url }))
    togglableRef.current.toggleVisibility()
    setTitle('')
    setAuthor('')
    setUrl('')
  }


  return (
    <Togglable buttonLabel="create new blog" ref={togglableRef}>
      <form onSubmit={addBlog}>
        <h2>create new blogs</h2>
        <div>
          <label>
            title
            <input
              type="text"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            author
            <input
              type="text"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            url
            <input
              type="text"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
          </label>
        </div>
        <button type="submit">create</button>
      </form>
    </Togglable>
  )
}

export default BlogForm
