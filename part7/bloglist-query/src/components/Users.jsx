import { useQuery } from '@tanstack/react-query'
import usersService from '../services/users'
import { Link } from 'react-router-dom'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Alert} from '@mui/material'

const Users = () => {
  const { isPending, isError, data } = useQuery({
    queryKey: ['users'],
    queryFn: usersService.getAll,
    retry: false,
  })

  if (isPending) {
    return <Typography sx={{ marginBlock: 2 }}>Loading...</Typography>
  }

  if (isError) {
    return <Alert sx={{marginBlock:2}} severity='error'>Users service not available due to problems in server</Alert>
  }

  const users = data.sort((uA, uB) => uB.blogs.length - uA.blogs.length)

  return (
    <TableContainer>
      <Table sx={{ maxWidth: 400 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Users</TableCell>
            <TableCell align="right">blogs created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
                maxWidth: 400,
              }}
            >
              <TableCell component="th" scope="row">
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </TableCell>
              <TableCell align="right">{user.blogs.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Users
