import { useLazyQuery, useQuery, useSubscription } from '@apollo/client/react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import LoginForm from './components/LoginForm';
import Notify from './components/Notify';

import { ALL_AUTHORS, ALL_BOOKS, ALL_GENRES, BOOK_ADDED, ME } from './queries';
import { useEffect, useState } from 'react';
import Recommendations from './components/Recommendations';

const App = () => {
    const navigate = useNavigate();
    const [token, setToken] = useState(localStorage.getItem('user-token'));
    const [errorMessage, setErrorMessage] = useState(null);
    const { loading: authorsDataLoading, data: authorsData } = useQuery(ALL_AUTHORS);
    const [allBooks, { loading: booksDataLoading, data: booksData }] = useLazyQuery(ALL_BOOKS);
    const { loading: userDataLoading, data: userData } = useQuery(ME); 
    
    const { data: genresData } = useQuery(ALL_GENRES);
    const [selectedGenre, setSelectedGenre] = useState('all genres');
    const genres = genresData ? [...new Set(genresData.allBooks.flatMap((b) => b.genres)), 'all genres'] : [];   

    useSubscription(BOOK_ADDED, {
        onData: ({ data }) => {
            const addedBook = data.data.bookAdded;            
            notify(`${addedBook.title} added`);
        },
    });

    useEffect(() => {
        allBooks({ variables: { genres: [] } });
    }, [allBooks]);

    const handleFilter = (g) => {
        setSelectedGenre(g);
        allBooks({ variables: { genres: g !== 'all genres' ? [g] : [] } });
    };

    const onLogout = () => {
        setToken(null);
        localStorage.clear();
        navigate('/login');
    };

    const notify = (message) => {
        setErrorMessage(message);
        setTimeout(() => {
            setErrorMessage(null);
        }, 10000);
    };

    return (
        <div>
            <div>
                <Link to='/'>
                    <button>Authors</button>
                </Link>
                <Link to='/books'>
                    <button>Books</button>
                </Link>
                {token ? (
                    <>
                        <Link to='/add'>
                            <button>Add book</button>
                        </Link>
                        <Link to='/recommendations'>
                            <button>recommend</button>
                        </Link>
                        <button onClick={onLogout}>Logout</button>
                    </>
                ) : (
                    <Link to='/login'>
                        <button>Login</button>
                    </Link>
                )}
            </div>
            <Notify errorMessage={errorMessage} />

            <Routes>
                <Route path='/' element={<Authors isLoading={authorsDataLoading} data={authorsData} />} />
                <Route
                    path='/books'
                    element={
                        <Books
                            isLoading={booksDataLoading}
                            data={booksData}
                            genres={genres}
                            selectedGenre={selectedGenre}
                            handleFilter={handleFilter}
                        />
                    }
                />
                {token && <Route path='/add' element={<NewBook user={userData} />} />}
                <Route path='/login' element={<LoginForm setToken={setToken} setError={notify} />} />
                <Route
                    path='/recommendations'
                    element={<Recommendations isLoading={userDataLoading} user={userData} />}
                />
            </Routes>
        </div>
    );
};

export default App;
