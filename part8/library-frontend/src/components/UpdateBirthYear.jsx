import { useMutation } from '@apollo/client/react'
import { useState } from 'react'
import { ALL_AUTHORS, EDIT_AUTHOR_BIRTH } from '../queries'

const UpdateBirthYear = ({ authors }) => {
	const [name, setName] = useState('')
	const [bornYear, setBornYear] = useState('')
	const [editAuthor] = useMutation(EDIT_AUTHOR_BIRTH, {
        refetchQueries: [{ query: ALL_AUTHORS }],
    });

	const submit = async (event) => {
		event.preventDefault()
		editAuthor({ variables: { name, born: Number(bornYear) } });
		setName('')
		setBornYear('')
	}

	const handleAuthorChange = (e) => {
		const selectedName = e.target.value;
		const author = authors.find((a) => a.name === selectedName);
		setName(author.name);
		setBornYear(author.born || '')
	}

	return (
        <div>
            <h2>set birthyear</h2>
            <form onSubmit={submit}>
                <div>
                    name
                    <select value={name} onChange={handleAuthorChange}>
                        <option value=''>Select author</option>
                        {authors.map((a) => (
                            <option key={a.id} value={a.name}>
                                {a.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    born
                    <input type='number' value={bornYear} onChange={({ target }) => setBornYear(target.value)} />
                </div>
                <button type='submit'>update Author</button>
            </form>
        </div>
    );
}

export default UpdateBirthYear;
