const Country = ({data}) => {
    const languages = Object.keys(data.languages);

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

        </div>
    )
}

export default Country