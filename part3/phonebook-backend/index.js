const { response } = require('express')
const express = require('express')
const app = express()
app.use(express.json())


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
    res.json(persons)
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

}

app.post('/api/persons', (req,res) =>{
    
    if(!req.body.name && !req.body.number) { //as far as I remember, we implemented frontend so that you can have only number or name

    }

    const person = {
        id: generateId(),
        name: req.body.name,//request.body.name?
        number: req.body.number,
    }

    persons = persons.concat(person)

    response.json(person)
    response.send(person)


})

//====================================================================================================
const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})