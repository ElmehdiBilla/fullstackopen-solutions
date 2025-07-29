import axios from "axios";
import { useEffect, useState } from "react";

const Country = ({data}) => {
    const [weather,setWeather] = useState(null);
    const languages = Object.keys(data.languages);
    const lat=data.capitalInfo.latlng[0];
    const lng=data.capitalInfo.latlng[1];
    const apiKey= import.meta.env.VITE_API_KEY
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric`

    useEffect(() => {
        axios.get(url)
        .then(response => setWeather(response.data))
    },[])

    return (
        <div>
            <h1>{data.name.common}</h1>
            <p>Capital {data.capital}</p>
            <p>Area {data.area}</p>

            <h2>Languages</h2>
            <ul>
                {
                    languages.map(l => <li key={l}>{data.languages[l]}</li>)
                }
            </ul>

            <img src={data.flags.png} alt="" />

            {
                weather && 
                <div>
                    <h2>Weather in {data.capital}</h2>
                    <p>Temperature {weather.main.temp} Celsius</p>
                    <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].icon} />
                    <p>Wind {weather.wind.speed} m/s</p>
                </div>
            }

        </div>
    )
}

export default Country