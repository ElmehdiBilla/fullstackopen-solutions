import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    addBlog(state, action) {
      return [...state, action.payload]
    },
    setBlogs(state, action) {
      return action.payload
    },
  },
})

const { setBlogs, addBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs([...blogs].sort((bA, bB) => bB.likes - bA.likes)))
  }
}

export const createBlog = (blogObj) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(blogObj)
      dispatch(addBlog(newBlog))
      dispatch(setNotification(`a new blog ${newBlog.title} added`))
    } catch (error) {
      dispatch(setNotification(error.response.data.error, true))
    }
  }
}

export default blogSlice.reducer
