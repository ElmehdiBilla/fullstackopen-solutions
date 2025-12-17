import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/authReducer'
import { AppBar, Toolbar, Button, Typography, Box } from '@mui/material'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'

const Menu = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <AppBar
      position="static"
      color="transparent"
      variant="outlined"
      square={false}
    >
      <Toolbar>
        <Button color="inherit" component={Link} to="/">
          blogs
        </Button>
        <Button color="inherit" component={Link} to="/users">
          users
        </Button>
        <Box sx={{ flexGrow: 1 }} />
        {user && (
          <>
            <Typography>{user.name} logged in</Typography>
            <Button
              endIcon={<LogoutRoundedIcon />}
              variant="outlined"
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
