import { useSelector, useDispatch } from 'react-redux';
import { voting } from '../reducers/anecdoteReducer';

const Anecdote = ({ anecdote, handleClick }) => {
    return (
        <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
                has {anecdote.votes}
                <button onClick={handleClick}>vote</button>
            </div>
        </div>
    );
};

const AnecdoteList = () => {
    const dispatch = useDispatch();
    const anecdotes = useSelector(({ filter, anecdotes }) => {
        const data = filter ? anecdotes.filter(a => a.content.includes(filter)) : [...anecdotes]
        return data.sort((aA, aB) => aB.votes - aA.votes)
    });

    return (
        <div>
            {anecdotes.map((anecdote) => (
                <Anecdote key={anecdote.id} anecdote={anecdote} handleClick={() => dispatch(voting(anecdote.id))} />
            ))}
        </div>
    );
};

export default AnecdoteList;
