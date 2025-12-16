import { useMatch } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import usersService from '../services/users'

const User = () => {
  const match = useMatch('/users/:id')

  const { isPending, isError, data } = useQuery({
    queryKey: ['users'],
    queryFn: usersService.getAll,
    retry: false,
  })

  if (isPending) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Users service not available due to problems in server</span>
  }

  const user = match ? data.find((u) => u.id === match.params.id) : null

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
