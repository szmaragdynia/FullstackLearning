import axios from 'axios'


const url = 'http://localhost:3001/persons'

const getAll = () => {
    return axios
      .get(url)
      .then(response => response.data)
}


const create = newPerson => {
    return axios
        .post(url, newPerson)
        .then(response => response.data)  
}

const deletePerson = id => {
    return axios
        .delete(`${url}/${id}`)
}


export default { getAll, create, deletePerson }