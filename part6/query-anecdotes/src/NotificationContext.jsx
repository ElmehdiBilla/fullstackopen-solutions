import { useReducer } from 'react'
import { createContext } from 'react'

const NotificationContext = createContext()

let timeoutId = null

export const setNotification = (notificationDispatch, message, time = 5) => {
  notificationDispatch({
    type: 'SHOW_MESSAGE',
    payload: { message },
  })

  if (timeoutId) {
    clearTimeout(timeoutId)
  }

  timeoutId = setTimeout(() => {
    notificationDispatch({ type: 'REMOVE_MESSAGE' })
    timeoutId = null
  }, time * 1000)
}

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW_MESSAGE':
      return { message: action.payload.message }
    case 'REMOVE_MESSAGE':
      return { message: '' }
    default:
      return state
  }
}

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, {
    message: '',
  })

  return (
    <NotificationContext.Provider
      value={{ notification, notificationDispatch }}
    >
      {props.children}
    </NotificationContext.Provider>
  )
}
export default NotificationContext
