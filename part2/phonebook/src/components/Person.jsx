const Person = ({name, number, onDelete}) => {
    return (
        <p>
            {name} {number}
            <button 
                onClick={onDelete}
                onMouseEnter={(e) => {e.target.style.backgroundColor='#0000ff'}}
                onMouseOut={(e) => {e.target.style.backgroundColor=''}}
            >
            delete
            </button> 
        </p>
    );
};

export default Person;
