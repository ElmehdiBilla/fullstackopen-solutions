import Person from "./Person";

const Persons = ({data, handleDelete}) => {
    return (
        <div>
            {data.map((person) => (
                <Person 
                    key={person.id} 
                    name={person.name} 
                    number={person.number} 
                    onDelete={() => handleDelete(person.id)}/>
            ))}
        </div>
    );
};

export default Persons;
