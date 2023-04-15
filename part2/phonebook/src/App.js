import { useState, useEffect } from 'react'
import axios from 'axios'


const Persons = ({ persons, searchQuery }) => {
  const personsToShow = persons.filter( person => (person.name.toLowerCase()).includes(searchQuery))
  return (
    <div>
      {personsToShow.map(person => <Person key={person.name} person={person} />)}
    </div>
  )
}

const Person = ({ person }) => {
  return (
    <p key={person.name}>{person.name} {person.number}</p>
  )
}

const Filter = ( {searchQuery, handleSetSearchQuery} ) => {
  return (
    <div>
      Filter visible numbers: <input value={searchQuery} onChange={handleSetSearchQuery} /> 
    </div>
  )
}

const PersonForm = (props) => {
  return(
    <form onSubmit={props.addPerson}>
      <div> name: <input value={props.newName} onChange={props.handleNameChange} /> </div>
      <div> number: <input value={props.newNumber} onChange={props.handleNumberChange} /> </div>
      <div> <button type="submit">add</button> </div>
    </form>
  )
}

const App = () => {
  //-----state-----------------------------------------
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  //------effect hooks------------------------------------------
  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(reponse =>{
        setPersons(reponse.data)
      })
    }, [])
    


  //-----event handlers-----------------------------------------
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

  const handleSetSearchQuery = (event) => {
    setSearchQuery(event.target.value)
  }
  //------------------------------------------------------------
  


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchQuery={searchQuery} handleSetSearchQuery={handleSetSearchQuery} />
      

      <h3>Add new entry</h3>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />

      <h3>Numbers</h3>
      <Persons persons={persons} searchQuery={searchQuery} />
      
      </div>
  )
}

export default App








