const Countries = ({data}) => {
    return (
        <div>
            {
                data.map((c,i) => (
                    <p key={c.name.common+i}>{c.name.common}</p>
                ))
            }
        </div>
    )
}

export default Countries