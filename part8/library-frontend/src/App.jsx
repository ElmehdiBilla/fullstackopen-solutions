import { useQuery } from '@apollo/client/react';
import { Routes, Route, Link } from 'react-router-dom';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';

import { ALL_AUTHORS, ALL_BOOKS } from './queries';

const padding = 4;

const App = () => {
    const { loading: authorsDataLoading, data: authorsData } = useQuery(ALL_AUTHORS);
    const { loading: booksDataLoading, data: booksData } = useQuery(ALL_BOOKS);

    return (
        <div>
            <div>
                <Link style={{ padding }} to='/'>Authors</Link>
                <Link style={{ padding }} to='/books'>Books</Link>
                <Link style={{ padding }} to='/add'>Add book</Link>
            </div>
            <Routes>
                <Route path='/' element={<Authors isLoading={authorsDataLoading} data={authorsData} />} />
                <Route path='/books' element={<Books isLoading={booksDataLoading} data={booksData} />} />
                <Route path='/add' element={<NewBook />} />
            </Routes>
        </div>
    );
};

export default App;
