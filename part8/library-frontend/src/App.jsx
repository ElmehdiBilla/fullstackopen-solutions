import { useQuery } from '@apollo/client/react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import LoginForm from './components/LoginForm';
import Notify from './components/Notify';

import { ALL_AUTHORS, ALL_BOOKS, ME } from './queries';
import { useState } from 'react';
import Recommendations from './components/Recommendations';

const App = () => {
    const navigate = useNavigate();
    const [token, setToken] = useState(localStorage.getItem('user-token'));
    const [errorMessage, setErrorMessage] = useState(null);
    const { loading: authorsDataLoading, data: authorsData } = useQuery(ALL_AUTHORS);
    const { loading: booksDataLoading, data: booksData } = useQuery(ALL_BOOKS);
    const { loading: UserDataLoading, data: userData } = useQuery(ME);

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
                <Route path='/books' element={<Books isLoading={booksDataLoading} data={booksData} />} />
                {token && <Route path='/add' element={<NewBook />} />}
                <Route path='/login' element={<LoginForm setToken={setToken} setError={notify} />} />
                <Route path='/recommendations' element={<Recommendations isLoading={booksDataLoading} user={userData} data={booksData} />} />
            </Routes>
        </div>
    );
};

export default App;
