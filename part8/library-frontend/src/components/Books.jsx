const Books = ({ data, isLoading, genres, selectedGenre, handleFilter }) => {
    if (isLoading) {
        return <div>loading...</div>;
    }

    if (!data) {
        return null;
    }

    const books = data.allBooks;

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
                <button key={i} onClick={() => handleFilter(g)}>
                    {g}
                </button>
            ))}
        </div>
    );
};

export default Books;
