require('dotenv').config()
const Person = require('./models/person')
const express = require('express')
const morgan = require('morgan')
const cors = require ('cors')

const app = express()

app.use(express.json())
app.use(express.static('build'))

morgan.token('data', function (req, res) { 
    return JSON.stringify(req.body) 
})
const tinyPlusPOSTData = (tokens, req, res) => {
    if(tokens.method(req, res) === 'POST') {
        return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        tokens.data(req,res)
        ].join(' ')
    } else {
        return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        ].join(' ')
    }
}
app.use(morgan(tinyPlusPOSTData))


app.use(cors())





let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]



app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>')
})


app.get('/api/persons', (req,res) => {
    Person.find({}).then(persons => res.json(persons))
})


app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    //console.log(req.params.id) //=2
    //console.log(typeof(req.params.id)) //=string
    //console.log(Number(req.params.id)) //=2

    const person = persons.find(p => p.id === id)
    //const person = persons.filter(p => p.id === id) //nope, this returns an array constitng of one object

    if(person){
        res.json(person)
    } else {
        res.status(404).end()
    }    
})


app.get('/info', (req,res) => {
    const date = new Date(Date.now())
    res.send(`
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${date}</p>
        `)
})


app.delete('/api/persons/:id', (req,res) => {
    const id = Number(req.params.id)
    persons = persons.filter(p => p.id !== id)
    res.status(204).end()
})

const generateId = () => {
    const max = 1000000 //magical number
    return Math.floor((Math.random() * max))
}

app.post('/api/persons', (req,res) =>{
    
    if(!req.body.name || !req.body.number) { 
        return res.status(400).json({error: 'name and number are both required'})
    }
    
    /*const alreadyExists = persons.find(p => p.name === req.body.name)
    if(alreadyExists) {
        return res.status(400).json({error: 'name already in database'})
    } */

    const person = new Person({
        name: req.body.name,//request.body.name?
        number: req.body.number //if number is empty, will it break or just give no number? I think that's (latter) we had the frontend
    })

    person.save().then(savedPerson => {
        console.log(`Added ${savedPerson}`)
        res.json(savedPerson)
    })

})

//====================================================================================================
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})