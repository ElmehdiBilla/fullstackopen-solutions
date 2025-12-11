import { useReducer } from 'react'
import { createContext } from 'react'

const initialState = {
  message: '',
  isError: false,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return {
        message: action.payload.message,
        isError: action.payload.isError,
      }
    case 'REMOVE_NOTIFICATION':
      return initialState
    default:
      return state
  }
}


const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, dispatch] = useReducer(reducer, initialState)

	  const setNotification = (message, isError = false, duration = 5000) => {
      dispatch({
        type: 'SHOW_NOTIFICATION',
        payload: { message, isError },
      })

      setTimeout(() => {
        dispatch({ type: 'REMOVE_NOTIFICATION' })
      }, duration)
    }

	
	return(
		<NotificationContext.Provider value={{ notification, setNotification }}>
			{props.children}
		</NotificationContext.Provider>
	)
}

export default NotificationContext
