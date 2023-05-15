import axios from 'axios'



const baseUrl = "http://localhost:3001/notes"

/*const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}*/

const getAll = () => {
  const request = axios.get(baseUrl)
  const nonExisting = {
    id: 10000,
    content: 'This note is not saved to server',
    important: true,
  }
  //the above one were for debugging
  return request.then(response => response.data.concat(nonExisting))
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}


/*export default {
    getAll: getAll,
    create: create,
    update: update
}*/

//Since the names of the keys and the assigned variables are the same, we can write the object definition with a more compact syntax:
/*{ 
  getAll, 
  create, 
  update 
}*/

//As a result, the module definition gets simplified into the following form:

export default { getAll, create, update }

/*
const name = 'Leevi'
const age = 0

//In older js:
const person = {
  name: name,
  age: age
}

//ES6:
const person = { name, age } //just variable names, not key-variable

//The result is identical for both expressions. They both create an object with a name property with the value Leevi and an age property with the value 0.
*/