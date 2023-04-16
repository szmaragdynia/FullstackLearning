import { useState, useEffect } from 'react'
import personsService from './services/persons'


const Persons = ({ persons, searchQuery }) => {
  const personsToShow = persons.filter( person => (person.name.toLowerCase()).includes(searchQuery))
  return (
    <div>
      {personsToShow.map(person => <Person key={person.id} person={person} />)}
    </div>
  )
}

const Person = ({ person }) => {
  return (
    <p>{person.name} {person.number}</p>
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
    personsService
      .getAll()
      .then(initialPersons =>{
        setPersons(initialPersons)
      })
      .catch(error => alert("failed getting initial persons"))
    }, [])
  //-----event handlers-----------------------------------------
  const addPerson = (event) => {
    event.preventDefault()
    //console.log("event.target: ",event.target, " event.target.value: ",event.target.value)
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
    personsService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
      .catch(error => alert("failed adding person"))

  }

  const handleNameChange = (event) => {
    //console.log("event.target: ",event.target, " event.target.value: ",event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    //console.log("event.target: ",event.target, " event.target.value: ",event.target.value)
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








