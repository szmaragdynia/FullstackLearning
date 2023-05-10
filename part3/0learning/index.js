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


app.get('/api/notes/:id', (request, response, next) => {
  Note.findById(request.params.id).then(note => {
    if (note) {
      response.json(note)
    } else {  //case for properly formed id's, but with no note with such id
      response.status(404).end()
    }
  }).catch(error => next(error)) //If next was called without a parameter, then the execution would simply move onto the next route or middleware. If the next function is called with a parameter, then the execution will continue to the error handler middleware.)
})


app.delete('/api/notes/:id', (request, response, next) => {
  Note.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
  //const id = Number(request.params.id)
  //notes = notes.filter(note => note.id !== id)
})


app.post('/api/notes', (request, response) =>{
  if (!request.body.content){
    return response.status(400).json({error: "content missing"})
  }

  const note = new Note ({
    content: request.body.content,
    important: request.body.important || false,
  })
  note.save().then(savedNote => {
    response.json(savedNote)
  })
})

app.put('/api/notes/:id', (request, response, next) => {
  const note = {
    content: request.body.content,
    important: request.body.important,
  }
  //Notice the method receives a regular JavaScript object as its parameter, and not a new note object created with the Note constructor function.
  //By default, the updatedNote parameter of the event handler receives the original document without the modifications.{ new: true } parameter, will cause our event handler to be called with the new modified document instead of the original.
  Note.findByIdAndUpdate(request.params.id, note, {new: true})
    .then(updatedNote => response.json(updatedNote))
    .catch(error => next(error))
})



const unknownEndpoint = (request, response) => {
  response.status(404).send({error: 'unknown endpoint'})
}
app.use(unknownEndpoint)


const errorHandler = (error, request, response, next) => {
  console.log("error message:", error.message)

  if (error.name === 'CastError') { //this error is returned if malformed id is used
    return response.status(400).send({error: 'malformed id'})
  }
  next(error) //In all other error situations (note there is return above), the middleware passes the error forward to the default Express error handler.
}

//error-handling middleware has to be the last loaded middleware!
  //probably? because otherwise the "next(error)" will use some other middleware??
app.use(errorHandler) 



const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


