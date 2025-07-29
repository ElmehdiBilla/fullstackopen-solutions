import axios from "axios";
import { useEffect, useState } from "react"
import Countries from "./components/countries";
import Country from "./components/Country";

function App() {
  const [data, setData] = useState([]);
  const [countries, setCountries] = useState([]);
  const [inputValue, setInputValue] = useState('');


  useEffect(() => {

    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(response => setData(response.data));

  },[])


  const handleChange = (e) => {
    const search = e.target.value;
    setInputValue(search);
    setCountries(data.filter(c => c.name.common.toLowerCase().includes(search.toLowerCase())))
  }

  const handleClick = (name) => {
    setCountries(data.filter(c => c.name.common.toLowerCase() === name.toLowerCase()))
  }


  return (
    <>
      <div>find countries <input value={inputValue} onChange={handleChange} /></div>
      {
        countries.length > 10 ?
        <p>Too many matches, specify another filter</p>
        :
        (
          countries.length === 1 ? 
          <Country data={countries[0]}/>
          :
          <Countries data={countries} onClick={handleClick}/>
        )
      }
    </>
  )
}

export default App
