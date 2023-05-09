
const express = require('express')
const app = express()

//middleware - functions that can be used for handling request and response objects.
//they're executed one by one in the order that they were taken into use (express().use) in express.
app.use(express.json())
app.use(express.static('build'))

//Let's implement our own middleware that prints information about every request that is sent to the server.
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:', request.path)
  console.log('Body:', request.body)
  console.log('---')
  next() //The next function yields control to the next middleware.
}
app.use(requestLogger)

const cors = require('cors')
app.use(cors())



/*
Middleware functions have to be taken into use before routes if we want them to be executed before the route event handlers are called. There are also situations where we want to define
 middleware functions after routes. In practice, this means that we are defining middleware functions that are only called if no route handles the HTTP request.
*/




let notes= [
    {
      "id": 1,
      "content": "HTML is easy",
      "important": true
    },
    {
      "id": 2,
      "content": "Browser can execute only JavaScript",
      "important": false
    },
    {
      "id": 3,
      "content": "GET and POST are the most important methods of HTTP protocol",
      "important": true
    }
]


app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>') 
})


app.get('/api/notes', (request, response) => {
  response.json(notes)
})


app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find(note => note.id === id)

  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})


app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)
  response.status(204).end()
})


app.post('/api/notes', (request, response) =>{
  //const maxId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) : 0 
    //this is now a separate function

  if (!request.body.content){//undefined is falsy, that probably will be undefined if empty?
    return response.status(400).json({error: "content missing"})
  }//tego nie bylo xd
  
  //const note = request.body
  //note.id = maxId + 1
    //previously we could set arbitrary properties - now we do not.
  const note = {
    content: request.body.content,
    important: request.body.important || false,
    id: generateId()
  }

  notes = notes.concat(note)

  response.json(note)
})

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) : 0 
  return maxId + 1
}



const unknownEndpoint = (request, response) => {
  response.status(404).send({error: 'unknown endpoint'})
}
app.use(unknownEndpoint)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
