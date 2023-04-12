import { useState } from 'react'

const Person = ({ person }) => {
  return (
    <p>{person.name} {person.number}</p>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  
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
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
  }


  const handleNameChange = (event) => {
    console.log("event.target: ",event.target, " event.target.value: ",event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log("event.target: ",event.target, " event.target.value: ",event.target.value)
    setNewNumber(event.target.value)
  }

  const personsToShow = persons.filter( person => (person.name.toLowerCase()).includes(searchQuery))


  return (
    <div>
      <h2>Phonebook</h2>
      <div> Filter visible numbers: <input value={searchQuery} onChange={(event)=> setSearchQuery(event.target.value)} /> </div>

      <h2>Add new entry</h2>
      <form onSubmit={addPerson}>
        <div> name: <input value={newName} onChange={handleNameChange} /> </div>
        <div> number: <input value={newNumber} onChange={handleNumberChange} /> </div>
        <div> <button type="submit">add</button> </div>
      </form>

      <h2>Numbers</h2>
      <div>
        {personsToShow.map(person => <Person key={person.name} person={person}/>)}
      </div>
    </div>
  )
}

export default App