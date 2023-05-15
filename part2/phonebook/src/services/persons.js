import axios from 'axios'


const url = '/api/persons'

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

const update = (id, newObject) => {
    return axios
        .put(`${url}/${id}`, newObject)
        .then(response => response.data)
}

export default { getAll, create, deletePerson, update }