import { useReducer } from 'react'
import { createContext } from 'react'
import NotificationContext from './NotificationContext'
import { useContext } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'

const initialState = null

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN': {
      return action.payload 
    }
    case 'LOGOUT':
      return initialState
    default:
      return state
  }
}

const AuthContext = createContext()

export const AuthContextProvider = (props) => {
  const [user, authDispatch] = useReducer(reducer, initialState)
  const { setNotification } = useContext(NotificationContext)
  
  const initializeUser = async () => {
    let user = null
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
    }
    authDispatch({ type: 'LOGIN' , payload: user})
  }
  
  const login = async ({ username, password }) => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      authDispatch({ type: 'LOGIN', payload: user })
    } catch (error) {
      setNotification(error.response.data.error, true)
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedUser')
    authDispatch({ type: 'LOGOUT' })
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, initializeUser }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext
