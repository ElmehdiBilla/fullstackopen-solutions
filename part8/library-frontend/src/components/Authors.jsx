import { useState } from 'react';
import UpdateBirthYear from './UpdateBirthYear';

const Authors = ({ data, isLoading }) => {
    const [token] = useState(localStorage.getItem('user-token'));

    if (isLoading) {
        return <div>loading...</div>;
    }

    if (!data) {
        return null;
    }

    return (
        <div>
            <h2>authors</h2>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>born</th>
                        <th>books</th>
                    </tr>
                    {data.allAuthors.map((a) => (
                        <tr key={a.id}>
                            <td>{a.name}</td>
                            <td>{a.born}</td>
                            <td>{a.bookCount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {token && <UpdateBirthYear authors={data.allAuthors} />}
        </div>
    );
};

export default Authors;
