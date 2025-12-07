import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes';
import { removeMessage, showMessage } from './notificationReducer';

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        vote(state, action) {
            const { id } = action.payload;
            return state.map((anecdote) => (anecdote.id === id ? action.payload : anecdote));
        },
        createAnecdote(state, action) {
            return [...state, action.payload];
        },
        setAnecdotes(state, action) {
            return action.payload;
        },
    },
});

const { setAnecdotes, createAnecdote, vote } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
    return async (dispatch) => {
        const anecdotes = await anecdoteService.getAll();
        dispatch(setAnecdotes(anecdotes));
    };
};

export const appendAnecdote = (content) => {
    return async (dispatch) => {
        const newAnecdote = await anecdoteService.create(content);
        dispatch(createAnecdote(newAnecdote));
    };
};

export const voting = (id) => {
    return async (dispatch) => {
        const updatedAnecdote = await anecdoteService.vote(id);
        dispatch(vote(updatedAnecdote));
        dispatch(showMessage({ message: `You voted ${updatedAnecdote.content}` }));
        setTimeout(() => {
            dispatch(removeMessage());
        }, 5000);
    };
};

export default anecdoteSlice.reducer;
