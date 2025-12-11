import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    message: '',
    isError: false,
  },
  reducers: {
    showMessage(state, action) {
      return {
        message: action.payload.message,
        isError: action.payload.isError,
      }
    },
    removeMessage() {
      return {
        message: '',
        isError: false,
      }
    },
  },
})

const { showMessage, removeMessage } = notificationSlice.actions

let timeoutId = null

export const setNotification = (message, isError = false, time = 5) => {	
  return (dispatch) => {
    dispatch(showMessage({ message, isError }))

    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      dispatch(removeMessage())
      timeoutId = null
    }, time * 1000)
  }
}

export default notificationSlice.reducer
