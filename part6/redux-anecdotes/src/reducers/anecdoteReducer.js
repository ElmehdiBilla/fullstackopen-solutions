import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        vote(state, action) {
            const id = action.payload;
            const anecdoteVoted = state.find((anecdote) => anecdote.id === id);
            return state.map((anecdote) =>
                anecdote.id === id ? { ...anecdoteVoted, votes: anecdote.votes + 1 } : anecdote
            );
        },
        createAnecdote(state, action) {
            return [...state, action.payload];
        },
        setAnecdotes(state, action) {
            return action.payload;
        },
    },
});

const { setAnecdotes } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
    return async (dispatch) => {
        const anecdotes = await anecdoteService.getAll();
        dispatch(setAnecdotes(anecdotes));
    };
};

export const { vote, createAnecdote } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
