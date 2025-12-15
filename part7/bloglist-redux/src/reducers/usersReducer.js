import { createSlice } from '@reduxjs/toolkit'
import usersService from '../services/users'

const blogSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUser(state, action) {
      return action.payload
    },
  },
})

const { setUser } = blogSlice.actions

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await usersService.getAll()
    dispatch(
      setUser([...users].sort((uA, uB) => uB.blogs.length - uA.blogs.length)),
    )
  }
}


export default blogSlice.reducer
