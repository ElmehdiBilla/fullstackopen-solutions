import { useContext } from 'react'
import AuthContext from '../AuthContext'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Button, Typography } from '@mui/material'


const Menu = () => {
  const { user, logout } = useContext(AuthContext)

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
