import { useEffect, useState } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import personService from './services/persons'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [filter, setFilter] = useState("");
    const [showAll, setShowAll] = useState(true);

    useEffect(
        () => {
            personService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
            })
        }
    ,[])

    const handleDelete = (id) => {
        const person = persons.find(p => p.id === id)
        if(confirm(`Delete ${person.name} ?`)){
            personService
            .deleting(person.id)
            .then(deletedPerson => {
                setPersons([...persons.filter(p => p.id !== deletedPerson.id)]);
            })
        }
    };

    const handleChange = (e) => {
        setNewName(e.target.value);
    };

    const handleNumberChange = (e) => {
        setNewNumber(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const person = persons.find(p => p.name.toLowerCase() === newName.toLowerCase())

        if(person) {
            if(confirm(`${newName} is already added to phonebook, replace the old number with a new one`)){
                const changedPerson = {...person, number:newNumber}
                personService
                .update(person.id,changedPerson)
                .then(returnedPerson => {
                    setPersons(persons.map((p) => (p.id !== person.id ? p : returnedPerson)))
                })
            }
            return;
        }

        personService
        .create({name: newName, number:newNumber})
        .then(returnedPerson => {
            setPersons([...persons, returnedPerson]);
            setNewName('');
            setNewNumber('');
        })
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
            
            <Persons data={personsToShow} handleDelete={handleDelete} />
        </div>
    );
};

export default App;
