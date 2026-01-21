const Recommendations = ({ isLoading, user, data }) => {

    if (isLoading) {
        return <div>loading...</div>;
    }

    if (!user || !data) {
        return null;
    }
		
    const books = data.allBooks.filter((b) => b.genres.includes(user.me.favoriteGenre));

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
