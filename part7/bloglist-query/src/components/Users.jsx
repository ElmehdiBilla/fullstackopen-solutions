import { useQuery } from '@tanstack/react-query'
import usersService from '../services/users'
import { Link } from 'react-router-dom'

const Users = () => {
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

  const users = data.sort((uA, uB) => uB.blogs.length - uA.blogs.length)

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
