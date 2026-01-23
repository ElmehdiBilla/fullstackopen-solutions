import { useQuery } from '@apollo/client/react';
import { ALL_BOOKS } from '../queries';

const Recommendations = ({ isLoading, user }) => {
    const favoriteGenre = user?.me?.favoriteGenre;

    const { loading: BooksDataLoading, data: booksData } = useQuery(ALL_BOOKS, {
        variables: { genres: [favoriteGenre] },
        skip: !favoriteGenre,
    });

    if (isLoading || BooksDataLoading) {
        return <div>loading...</div>;
    }

    if (!user || !booksData) {
        return null;
    }

    const books = booksData.allBooks;

    return (
        <div>
            <h2>Recommendations</h2>
            <p>
                books in your favorite genre <strong>{user.me.favoriteGenre}</strong>
            </p>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>author</th>
                        <th>published</th>
                    </tr>
                    {books.map((b) => (
                        <tr key={b.id}>
                            <td>{b.title}</td>
                            <td>{b.author.name}</td>
                            <td>{b.published}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Recommendations;
