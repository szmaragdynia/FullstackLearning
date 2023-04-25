
const express = require('express')
const app = express()
//we're importing express, which this time is a function that is used to create an express application stored in the app variable


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




const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
