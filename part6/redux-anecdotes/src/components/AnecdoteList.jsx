import { useSelector, useDispatch } from 'react-redux';
import { vote } from '../reducers/anecdoteReducer';
import { removeMessage, showMessage } from '../reducers/notificationReducer';

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
    
    const handleVote = (anecdote) => {
        dispatch(vote(anecdote.id))
        dispatch(showMessage({ message: `You voted ${anecdote.content}` }))
        setTimeout(() => {
            dispatch(removeMessage());
        }, 5000);
    }

    return (
        <div>
            {anecdotes.map((anecdote) => (
                <Anecdote key={anecdote.id} anecdote={anecdote} handleClick={() => handleVote(anecdote)} />
            ))}
        </div>
    );
};

export default AnecdoteList;
