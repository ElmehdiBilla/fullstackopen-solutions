import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMatch } from 'react-router-dom'
import { initializeUsers } from '../reducers/usersReducer'

const User = () => {
  const dispatch = useDispatch()
  const match = useMatch('/users/:id')
  const users = useSelector((state) => state.users)
  const user = match ? users.find((u) => u.id === match.params.id) : null

  useEffect(() => {
    if (users.length === 0) {
      dispatch(initializeUsers())
    }
  }, [dispatch, users.length])

  if (!user) {
    return null
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>
            <p>{blog.title}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default User
