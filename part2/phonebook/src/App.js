import { useState } from 'react'

const Person = ({ person }) => {
  return (
    <p>{person.name}</p>
  )
}

const dude = { name: 'Arto Hellas' }

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  
  
  const addPerson = (event) => {
    event.preventDefault()
    console.log("event.target: ",event.target, " event.target.value: ",event.target.value)
    
    /*const names = persons.map(v => v.name) //from array of object transform into array of contents of 'name' property of the object
    if(names.includes(newName)) {
      alert(`${newName} is already added to phonebook`) //alert(newName, "is already added to phonebook") does not work becasue console.log() just can accept more arguments
      return;
    }*/
    
    if(persons.some( person => person.name === newName )) {
      alert(`${newName} is already added to phonebook`) //alert(newName, "is already added to phonebook") does not work becasue console.log() just can accept more arguments
      return;
    }

    const newPerson = {
      name: newName
    }
    setPersons(persons.concat(newPerson))
    setNewName('')
  }

  const handleNameChange = (event) => {
    console.log("event.target: ",event.target, " event.target.value: ",event.target.value)

    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <form onSubmit={addPerson}>
        <div>
          name: 
          <input 
          value={newName}
          onChange={handleNameChange}
          />
        </div>

        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      <div>
        {persons.map(person => <Person key={person.name} person={person}/>)}
      </div>
    </div>
  )
}

export default App