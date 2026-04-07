import axios from 'axios';
import { useEffect, useState } from 'react';

interface Diary {
    id: number;
    date: string;
    weather: 'sunny' | 'rainy' | 'cloudy' | 'stormy' | 'windy';
    visibility: 'great' | 'good' | 'ok' | 'poor';
    comment: string;
}

function App() {
    const [diaries, setDiaries] = useState<Diary[]>([]);
    const [date, setDate] = useState('');
    const [visibility, setVisibility] = useState('');
    const [weather, setWeather] = useState('');
    const [comment, setComment] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get<Diary[]>('http://localhost:3000/api/diaries').then((response) => {
            setDiaries(response.data);
        });
    }, []);

    const notify = (message: string) => {
        setError(message)
        setTimeout(() => {
            setError('')
        }, 3000);
    }

    const diaryCreation = (event: React.SyntheticEvent) => {
        event.preventDefault();
        const diaryToAdd = {
            date,
            visibility,
            weather,
            comment,
        };

        axios.post<Diary>('http://localhost:3000/api/diaries', diaryToAdd)
        .then((response) => {
            setDiaries(diaries.concat(response.data));
            setDate('');
            setVisibility('');
            setWeather('');
            setComment('');
        }).catch(error => {
            if (axios.isAxiosError(error)) {
                notify(error.response?.data);
            } else {
                notify('Unknown error');
            }
        });
    };

    return (
        <div>
            <h2>Add new entry</h2>
            <p style={{color:"red"}} >{error}</p>
            <form onSubmit={diaryCreation}>
                <p>
                    <label htmlFor='date'>date</label>
                    <input name='date' value={date} onChange={(event) => setDate(event.target.value)} />
                </p>
                <p>
                    <label htmlFor='visibility'>visibility</label>
                    <input
                        name='visibility'
                        value={visibility}
                        onChange={(event) => setVisibility(event.target.value)}
                    />
                </p>
                <p>
                    <label htmlFor='weather'>weather</label>
                    <input name='weather' value={weather} onChange={(event) => setWeather(event.target.value)} />
                </p>
                <p>
                    <label htmlFor='comment'>comment</label>
                    <input name='comment' value={comment} onChange={(event) => setComment(event.target.value)} />
                </p>
                <button type='submit'>add</button>
            </form>
            <h2>Diary entries</h2>
            {diaries.map((diary) => (
                <div key={diary.id}>
                    <h3>{diary.date}</h3>
                    <p>visibility: {diary.visibility}</p>
                    <p>weather: {diary.weather}</p>
                </div>
            ))}
        </div>
    );
}

export default App;
