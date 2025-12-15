import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import authReducer from './reducers/authReducer'
import usersReducer from './reducers/usersReducer'

const store = configureStore({
  reducer: {
    user: authReducer,
    users: usersReducer,
    blogs: blogReducer,
    notification: notificationReducer,
  },
})

export default store
