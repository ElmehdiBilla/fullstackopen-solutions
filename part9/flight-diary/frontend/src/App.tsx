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
    const [visibility, setVisibility] = useState<Diary['visibility']>('great');
    const [weather, setWeather] = useState<Diary['weather']>('sunny');
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
            setVisibility('great');
            setWeather('sunny');
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
            <p style={{ color: 'red' }}>{error}</p>
            <form onSubmit={diaryCreation}>
                <p>
                    <label htmlFor='date'>date</label>
                    <input type='date' name='date' value={date} onChange={(event) => setDate(event.target.value)} />
                </p>
                <p>
                    <label htmlFor='visibility'>visibility </label>

                    <label>
                        great
                        <input
                            type='radio'
                            name='visibility'
                            value='great'
                            checked={visibility === 'great'}
                            onChange={() => setVisibility('great')}
                        />
                    </label>

                    <label>
                        good
                        <input
                            type='radio'
                            name='visibility'
                            value='good'
                            checked={visibility === 'good'}
                            onChange={() => setVisibility('good')}
                        />
                    </label>

                    <label>
                        ok
                        <input
                            type='radio'
                            name='visibility'
                            value='ok'
                            checked={visibility === 'ok'}
                            onChange={() => setVisibility('ok')}
                        />
                    </label>

                    <label>
                        poor
                        <input
                            type='radio'
                            name='visibility'
                            value='poor'
                            checked={visibility === 'poor'}
                            onChange={() => setVisibility('poor')}
                        />
                    </label>
                </p>

                <p>
                    <label htmlFor='weather'>weather </label>

                    <label>
                        sunny
                        <input
                            type='radio'
                            name='weather'
                            value='sunny'
                            checked={weather === 'sunny'}
                            onChange={() => setWeather('sunny')}
                        />
                    </label>

                    <label>
                        rainy
                        <input
                            type='radio'
                            name='weather'
                            value='rainy'
                            checked={weather === 'rainy'}
                            onChange={() => setWeather('rainy')}
                        />
                    </label>

                    <label>
                        cloudy
                        <input
                            type='radio'
                            name='weather'
                            value='cloudy'
                            checked={weather === 'cloudy'}
                            onChange={() => setWeather('cloudy')}
                        />
                    </label>

                    <label>
                        stormy
                        <input
                            type='radio'
                            name='weather'
                            value='stormy'
                            checked={weather === 'stormy'}
                            onChange={() => setWeather('stormy')}
                        />
                    </label>

                    <label>
                        windy
                        <input
                            type='radio'
                            name='weather'
                            value='windy'
                            checked={weather === 'windy'}
                            onChange={() => setWeather('windy')}
                        />
                    </label>
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
