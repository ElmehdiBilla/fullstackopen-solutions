import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        message: 'some message',
    },
    reducers: {},
});

export default notificationSlice.reducer;