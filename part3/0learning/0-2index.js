
const express = require('express')
const app = express()
//we're importing express, which this time is a function that is used to create an express application stored in the app variable

app.use(express.json())
//Without the json-parser, the body property would be undefined. The json-parser functions so that it takes the JSON data of a request, 
//transforms it into a JavaScript object and then attaches it to the body property of the request object before the route handler is called.

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

//Next, we define two routes to the application.
  //(request parameter contains all of the information of the HTTP request)
  //(response parameter is used to define how the request is responded to.)
//first one defines an event handler that is used to handle HTTP GET requests made to the application's / root
app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>') 
})
//Calling the method makes the server respond to the HTTP request by sending a response containing the string <h1>Hello World!</h1>
//since the parameter is a string, express automatically sets the value of the Content-Type header to be text/html. The status code of the response defaults to 200.


//The second route defines an event handler that handles HTTP GET requests made to the notes path of the application
app.get('/api/notes', (request, response) => {
  response.json(notes)
})
//Calling the 'json' method will send the notes array that was passed to it as a JSON formatted string
//Express automatically sets the Content-Type header with the appropriate value of application/json.


//In the earlier version where we were only using Node, we had to transform the data into the JSON format with the JSON.stringify method.
//With express, this is no longer required, because this transformation happens automatically.

//It's worth noting that JSON is a string and not a JavaScript object like the value assigned to notes.
          //????????????????? ALE DLAETGO ZE TO TABLICA, CZY JAKBY TO BYL OBIEKT Z OBKIETAMI TO TO SAMO? CO STARASZ SIE PRZEKAZAC?


app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find(note => note.id === id)

  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
  //We do not need to display anything in the browser because REST APIs are interfaces that are intended for programmatic use, and the error status code is all that is needed.
})


app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)
  response.status(204).end()
})
//If deleting the resource is successful, meaning that the note exists and is removed, we respond to the request with the status code 204 no content
//The 204 (No Content) status code indicates that the server has successfully fulfilled the request and that there is no additional content to send in the response conten
//There's no consensus on what status code should be returned to a DELETE request if the resource does not exist. The only two options are 204 and 404.


app.post('/api/notes', (request, response) =>{
  const maxId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) : 0 //notes.map() zwraca tablice, u nas tablice z id'ami. Taka tablica jest spreadowana jako poszczególne argumenty do Math.max()

  const note = request.body
  note.id = maxId + 1

  notes = notes.concat(note)

  response.json(note)
})
//The current version still has the problem that the HTTP POST request can be used to add objects with arbitrary properties. Let's improve the application by defining that the content property may not be empty. The important property will be given default value false. All other properties are discarded:



const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
