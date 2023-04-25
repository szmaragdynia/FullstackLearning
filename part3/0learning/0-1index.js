


const http = require('http') //bascially alias for 'import http from 'http' but the latter is newer

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

const app = http.createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'application/json'}) //informs the receiver that the data is in the JSON format.
    response.end(JSON.stringify(notes)) //The notes array gets transformed into JSON
})

//.createServer( eventHandler )
    //An event handler is registered to the server that is called every time an HTTP request is made to the server's address http://localhost:3001.

//The request is responded to with the status code 200, with the Content-Type header set to text/plain, 
//and the content of the site to be returned set to Hello World.



const PORT = 3001
app.listen(PORT)
//we bing the http server(assigned to app) to listen to HTTP requests sent to port 3001

console.log(`Server running on port ${PORT}`)