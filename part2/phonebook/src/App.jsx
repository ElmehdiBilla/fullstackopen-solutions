import { useState } from "react";

const App = () => {
    const [persons, setPersons] = useState([
        { name: "Arto Hellas", number: "040-123456", id: 1 },
        { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
        { name: "Dan Abramov", number: "12-43-234345", id: 3 },
        { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
    ]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [filter, setFilter] = useState("");
    const [showAll, setShowAll] = useState(true);

    const handleChange = (e) => {
        setNewName(e.target.value);
    };

    const handleNumberChange = (e) => {
        setNewNumber(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let isExist = false;
        persons.forEach((person) => {
        if(person.name.toLowerCase() === newName.toLowerCase() && person.number === newNumber){
            isExist=true;
        }
        });
        if(isExist) {
            alert(`${newName} is already added to phonebook`);
            return;
        }
        setPersons([...persons, {id:persons.length + 1 , name: newName , number:newNumber}]);
    };

    const handleFilter = (e) => {
        setShowAll(false);
        setFilter(e.target.value.toLowerCase());
    };

    const personsToShow = showAll
        ? persons
        : persons.filter((person) =>
            person.name.toLowerCase().includes(filter)
        );

    return (
        <div>
            <h2>Phonebook</h2>
            <div>
                filter shown with:
                <input value={filter} onChange={handleFilter} />
            </div>
            <form onSubmit={handleSubmit}>
                <h3>Add a new</h3>
                <div>
                    name: <input value={newName} onChange={handleChange} />
                </div>
                <div>
                    number: <input value={newNumber} onChange={handleNumberChange} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <div>
                {personsToShow.map((person) => (
                    <p key={person.id}>
                        {person.name} {person.number}
                    </p>
                ))}
            </div>
        </div>
    );
};

export default App;
