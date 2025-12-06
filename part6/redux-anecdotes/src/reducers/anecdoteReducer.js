import { createSlice } from '@reduxjs/toolkit';

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
    return {
        content: anecdote,
        id: getId(),
        votes: 0,
    };
};

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
            return [...state, asObject(action.payload)];
        },
        setAnecdotes(state, action) {
            return action.payload;
        },
    },
});

export const { vote, createAnecdote, setAnecdotes } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
