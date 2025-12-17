import { useContext } from 'react'
import AuthContext from '../AuthContext'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Button, Typography, Box } from '@mui/material'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'

const Menu = () => {
  const { user, logout } = useContext(AuthContext)

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
              onClick={logout}
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
