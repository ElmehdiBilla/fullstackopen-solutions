require('dotenv').config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const Person = require('./models/person');

let persons = [];

app.use(express.static('dist'))
app.use(express.json())
app.use(cors())

morgan.token('body', (req) => JSON.stringify(req.body));

app.use((req, res, next) => {
    if (req.method === 'POST') {
        return morgan(":method :url :status :res[content-length] - :response-time ms :body")(req, res, next);
    }
    return morgan("tiny")(req, res, next);
});


app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        return response.json(persons)
    })
})

app.get('/api/info', (request, response) => {
    const date = new Date();
    response.send(
        `
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${date}</p>
        `
    )
})

app.get('/api/persons/:id',(request, response) => {
    const id = request.params.id
    const person = persons.find((p) => p.id === id)
    if(!person){
        response.status(404).end()
    }
    response.json(person)
})

app.delete('/api/persons/:id',(request, response) => {
    const id = request.params.id
    persons = [...persons.filter((p) => p.id !== id)]
    response.status(204).end()
})

const generateId = () => {
    return Math.floor(Math.random() * 1000000) + persons.length
}

app.post('/api/persons', (request, response) => {
    const body = request.body;

    if(!body.name){
        return response.status(400).json({
            error: 'name is missing',
        })
    }

    if(!body.number){
        return response.status(400).json({
            error: 'number is missing',
        })
    }

    if(persons.some(p => p.name.toLowerCase() === body.name.toLowerCase())){
        return response.status(400).json({
            error: 'name must be unique',
        })
    }

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number,
    }
    persons = [...persons,person]
    response.json(person)
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})