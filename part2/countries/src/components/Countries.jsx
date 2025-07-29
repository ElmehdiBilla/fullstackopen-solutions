const Countries = ({data, onClick}) => {
    return (
        <div>
            {
                data.map((c,i) => (
                    <p key={c.name.common+i}>
                        {c.name.common} 
                        {' '}
                        <button onClick={() => onClick(c.name.common)}>Show</button>
                    </p>
                ))
            }
        </div>
    )
}

export default Countries