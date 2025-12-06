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

export const { showMessage, removeMessage } = notificationSlice.actions;
export default notificationSlice.reducer;
