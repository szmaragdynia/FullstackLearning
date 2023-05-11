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



app.get('/', (req, res) => {
  res.send('<h1>Hello World - you probably should see react app instead of this.</h1>')
})


app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then(persons => res.json(persons))
    .catch(error => next(error))
})


app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if(person){
        res.json(person)
      } else {
        res.status(404).end() //id of non-existent note (but properly formed - if bad, it is caught by catch)
      }
    })
    .catch(error => next(error))
})


app.get('/info', (req, res) => {
  const date = new Date(Date.now())
  Person.countDocuments().then(number => {
    res.send(`
            <p>Phonebook has info for ${number} people</p>
            <p>${date}</p>
        `)
  })

})


app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => res.status(204).end())
    .catch(error => next(error))
})


app.post('/api/persons', (req, res, next) => {
  const person = new Person({
    name: req.body.name,//request.body.name?
    number: req.body.number //if number is empty, will it break or just give no number? I think that's (latter) we had the frontend
  })

  person.save()
    .then(savedPerson => {
      console.log(`Added ${savedPerson}`)
      res.json(savedPerson)
    })
    .catch(error => next(error))
})


app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body

  Person.findByIdAndUpdate(
    req.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedNote => res.json(updatedNote))
    .catch(error => next(error))
})

const errorHandler = (error, req, res, next) => {
  console.log('error message:', error.message)

  if(error.name === 'CastError') {
    return res.status(400).send({ error: 'malformed id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }
  next(error) //if error is not CastError
}

app.use(errorHandler)

//====================================================================================================
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})