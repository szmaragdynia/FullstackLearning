require('dotenv').config() //taking .env into use
const Note = require('./models/note')
const express = require('express')
const app = express()

app.use(express.json())
app.use(express.static('build'))

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:', request.path)
  console.log('Body:', request.body)
  console.log('---')
  next() 
}
app.use(requestLogger)

const cors = require('cors')
app.use(cors())






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
  Note.find({}).then(notes => response.json(notes))
})


app.get('/api/notes/:id', (request, response) => {
  //const id = Number(request.params.id)
  //const note = notes.find(note => note.id === id)
  Note.findById(request.params.id).then(note => {
    if (note) {
      response.json(note)
    } else {  //if no note in the database, null is returned. THIS CASE IS FOR ids that DO MATCH MONGO IDENTIFIER FORMAT (for instance take some existing node id and change number within it - you get the 404 status. Use "1" as an id, you get 500 status code (error catched))
      response.status(404).end()
    }
  }).catch(error => {
    console.log("there was an error:", error)
    //response.status(500).end() //internal server error - in case the get promise returned by findById gets rejected
    response.status(400).send({error: 'malformed id'}) //are we certain that is the only one possible error?
  })
  
  
})


app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)
  response.status(204).end()
})


app.post('/api/notes', (request, response) =>{
  if (!request.body.content){
    return response.status(400).json({error: "content missing"})
  }

  const note = new Note ({
    content: request.body.content,
    important: request.body.important || false,
    //id: generateId() //no longer needed with db
  })
  
  //notes = notes.concat(note)
  //response.json(note)
  note.save().then(savedNote => {
    response.json(savedNote)
  })
})

/*const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) : 0 
  return maxId + 1
} */



const unknownEndpoint = (request, response) => {
  response.status(404).send({error: 'unknown endpoint'})
}
app.use(unknownEndpoint)


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
