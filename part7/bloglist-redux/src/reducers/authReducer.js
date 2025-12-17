import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { setNotification } from './notificationReducer'

const authSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    saveUser(state, action) {
      return action.payload
    },
    removeUser(state, action) {
      return null
    },
  },
})

const { saveUser, removeUser } = authSlice.actions

export const initializeUser = () => {
  return async (dispatch) => {
    let user = null
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
    }
    dispatch(saveUser(user))
  }
}

export const login = ({ username, password }) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(saveUser(user))
    } catch (error) {
      dispatch(setNotification(error.response.data.error, true))
    }
  }
}

export const logout = () => {
  return (dispatch) => {
    window.localStorage.removeItem('loggedUser')
    dispatch(removeUser)
    window.location.reload()
  }
}
export default authSlice.reducer
