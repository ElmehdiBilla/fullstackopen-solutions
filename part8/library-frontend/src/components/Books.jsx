import { useState } from 'react';

const Books = ({ data, isLoading }) => {
    const [selectedGenre, setSelectedGenre] = useState('all genres');

    if (isLoading) {
        return <div>loading...</div>;
    }

    if (!data) {
        return null;
    }

    const genres = [...new Set(data.allBooks.flatMap((b) => b.genres)), 'all genres'];
    const books = selectedGenre === 'all genres' ? data.allBooks : data.allBooks.filter((b) => b.genres.includes(selectedGenre) && b);

    return (
        <div>
            <h2>books</h2>
            <p>
                in genre <strong>{selectedGenre}</strong>
            </p>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>author</th>
                        <th>published</th>
                    </tr>
                    {books.map((a) => (
                        <tr key={a.id}>
                            <td>{a.title}</td>
                            <td>{a.author.name}</td>
                            <td>{a.published}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {genres.map((g, i) => (
                <button key={i} onClick={() => setSelectedGenre(g)}>
                    {g}
                </button>
            ))}
        </div>
    );
};

export default Books;
