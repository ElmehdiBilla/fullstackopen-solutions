import axios from "axios";
import { useEffect, useState } from "react";

interface Diary {
    id: number;
    date: string;
    weather: 'sunny' | 'rainy' | 'cloudy' | 'stormy' | 'windy';
    visibility: 'great' | 'good' | 'ok' | 'poor';
    comment: string;
}

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
      axios.get<Diary[]>('http://localhost:3000/api/diaries').then((response) => {
          setDiaries(response.data);
      });
  }, []);

  return (
      <div>
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

export default App