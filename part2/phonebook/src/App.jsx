import { useEffect, useState } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import axios from "axios";

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [filter, setFilter] = useState("");
    const [showAll, setShowAll] = useState(true);

    useEffect(
        () => {
            axios.get("http://localhost:3001/persons")
                .then(response => {
                    setPersons(response.data)
                })
        }
    ,[])

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
    }

    const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter))

    return (
        <div>
            <h2>Phonebook</h2>

            <Filter value={filter} onChange={handleFilter} />
            
            <h3>Add a new</h3>
            
            <PersonForm nameValue={newName} numberValue={newNumber} onSubmit={handleSubmit} onNameChange={handleChange} onNumberChange={handleNumberChange} />
        
            <h2>Numbers</h2>
            
            <Persons data={personsToShow} />
        </div>
    );
};

export default App;
