import { useMutation } from '@apollo/client/react'
import { useState } from 'react'
import { ALL_AUTHORS, EDIT_AUTHOR_BIRTH } from '../queries'

const UpdateBirthYear = () => {
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

	return (
        <div>
            <h2>set birthyear</h2>
            <form onSubmit={submit}>
                <div>
                    name
                    <input value={name} onChange={({ target }) => setName(target.value)} />
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
