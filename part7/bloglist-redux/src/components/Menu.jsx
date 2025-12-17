import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/authReducer'
import { AppBar, Toolbar, Button , Typography} from '@mui/material'

const Menu = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">
          blogs
        </Button>
        <Button color="inherit" component={Link} to="/users">
          users
        </Button>
        {user && (
          <>
            <Typography>{user.name} logged in</Typography>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={handleLogout}
            >
              logout
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Menu
