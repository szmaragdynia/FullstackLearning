
const express = require('express')
const app = express()


app.use(express.json())


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


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
