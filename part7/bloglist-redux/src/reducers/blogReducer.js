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
    updateBlog(state, action) {
      return state.map((b) => (b.id === action.payload.id ? action.payload : b))
    },
    removeBlog(state, action) {
      return state.filter((b) => b.id !== action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
  },
})

const { setBlogs, addBlog, updateBlog, removeBlog } = blogSlice.actions

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

export const likeBlog = (id, blogObj) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.update(id, blogObj)
      dispatch(updateBlog(updatedBlog))
      dispatch(setNotification('the blog likes is updated'))
    } catch (error) {
      dispatch(setNotification(error.response.data.error, true))
    }
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    try {
      await blogService.deleteBlog(id)
      dispatch(setNotification('the blog is deleted'))
      dispatch(removeBlog(id))
    } catch (error) {
      dispatch(setNotification(error.response.data.error, true))
    }
  }
}

export default blogSlice.reducer
