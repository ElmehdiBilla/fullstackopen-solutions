import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/authReducer'

const Menu = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const padding = 5
  const backgroundColor = '#ddd'
  const marginBottom = 5
  const menuStyle = {
    backgroundColor,
    padding,
    marginBottom,
  }

  const handleLogout = () => {
    dispatch(logout())
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
          {user.name} logged in <button onClick={handleLogout}>logout</button>
        </span>
      )}
    </div>
  )
}

export default Menu
