import { useState } from "react";

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");

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
        if (isExist) {
            alert(`${newName} is already added to phonebook`);
            return;
        }
        setPersons([...persons, {id:persons.length + 1 , name: newName , number:newNumber}]);
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={handleSubmit}>
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
                {persons.map((person) => (
                    <p key={person.id}>{person.name} {person.number}</p>
                ))}
            </div>
        </div>
    );
};

export default App;
