import Person from "./Person";

const Persons = ({data}) => {
    return (
        <div>
            {data.map((person) => (
                <Person key={person.id} name={person.name} number={person.number} />
            ))}
        </div>
    );
};

export default Persons;
