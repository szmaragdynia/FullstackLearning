require('dotenv').config()
const Person = require('./models/person')
const express = require('express')
const morgan = require('morgan')
const cors = require ('cors')
const { nextTick } = require('process')

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
    Person.findByIdAndRemove(req.params.id)
        .then(result => res.status(204).end())
        .catch(error => {
            console.log("error at delete", error)
            res.status(400).send({error: 'error at delete'})
        })
})


app.post('/api/persons', (req,res) =>{
    
    if(!req.body.name || !req.body.number) { 
        return res.status(400).json({error: 'name and number are both required'})
    }
    
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