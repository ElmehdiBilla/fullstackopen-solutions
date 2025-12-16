import { useContext } from 'react'
import AuthContext from '../AuthContext'
import { Link } from 'react-router-dom'

const Menu = () => {
  const { user, logout } = useContext(AuthContext)

  const padding = 5
  const backgroundColor = '#ddd'
  const marginBottom = 5
  const menuStyle = {
    backgroundColor,
    padding,
    marginBottom,
  }

  return (
    <div style={menuStyle}>
      <Link style={{ padding }} to="/">
        blogs
      </Link>
      <Link style={{ padding }} to="/users">
        users
      </Link>

      {user && (
        <span style={{ padding }}>
          {user.name} logged in <button onClick={logout}>logout</button>
        </span>
      )}
    </div>
  )
}

export default Menu
