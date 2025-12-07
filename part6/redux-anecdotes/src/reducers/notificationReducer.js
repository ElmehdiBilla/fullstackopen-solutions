import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        message: '',
    },
    reducers: {
        showMessage(state, action) {
            return {
                message: action.payload.message,
            };
        },
        removeMessage() {
            return {
                message: '',
            };
        },
    },
});

const { showMessage, removeMessage } = notificationSlice.actions;

let timeoutId = null ;

export const setNotification = (message, time = 5) => {

    return (dispatch) => {
        dispatch(showMessage({message}));

        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(() => {
            dispatch(removeMessage());
            timeoutId = null
        }, time * 1000);
    }
}

export default notificationSlice.reducer;
