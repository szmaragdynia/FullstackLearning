import { useState, useEffect } from 'react'
import personsService from './services/persons'


const Persons = ({ persons, searchQuery, deleteEntry }) => {
  const personsToShow = persons.filter( person => (person.name.toLowerCase()).includes(searchQuery))
  return (
    <div>
      {personsToShow.map(person => <Person key={person.id} person={person} deleteEntry={() => deleteEntry(person.id)}/>)}
    </div>
  )
}

const Person = ({ person, deleteEntry }) => {
  return (
    <div>
      <p>
        {person.name} {person.number}
        <button onClick={deleteEntry}>Delete</button>
      </p>

    </div>
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
    <form onSubmit={props.handleAdd}>
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

  const changeNumber = (existingPerson) => {
    if(window.confirm(`Do you want to change the person ${existingPerson.name} number from ${existingPerson.number} to ${newNumber}?`)) {
      const changedPerson = {...existingPerson, number: newNumber.trim()}
      
      personsService
        .update(existingPerson.id,changedPerson) //update server
        .then(returnedPerson => {
          setPersons(persons.map(prsn => prsn.id !== existingPerson.id ? prsn : returnedPerson))
        }).catch(error => alert("failed updating person"))
    } 
  }

  const addPerson = () => {
    const newPerson = {
      name: newName.trim(),
      number: newNumber.trim()
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

  const handleAdd = (event) => {
    event.preventDefault()
    /*
    //console.log("event.target: ",event.target, " event.target.value: ",event.target.value)
    const names = persons.map(v => v.name) //from array of object transform into array of contents of 'name' property of the object
    if(names.includes(newName)) {
      alert(`${newName} is already added to phonebook`) //alert(newName, "is already added to phonebook") does not work becasue console.log() just can accept more arguments
      return;
    }*/

    const existingPerson = persons.find( person => person.name === newName.trim() )
    if(existingPerson) {
      if(existingPerson.number === newNumber.trim()) {
        alert(`${existingPerson.name} with number ${existingPerson.number} is already added to phonebook. You can swap the number or add another person.`) 
        //alert(newName, "is already added to phonebook") does not work becasue console.log() just can accept more arguments
        return;
      } 
      else { changeNumber(existingPerson) }
    }
    else { addPerson() }
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

  const deleteEntry = id => {
    //console.log(`delete ${id}`)
    const personName = persons.find(prsn => prsn.id === id).name
    if(window.confirm(`Do you really want to delete person ${personName}`))
    {
      personsService
        .deletePerson(id)
        .then(() => setPersons(persons.filter(person => person.id !== id))
        )
        .catch(error => {
          alert(`could not process deletion of person ${personName}`)
          //no action here because we don't yet know if that person was not in the database, or it was but some other (?) error occured - so we dont know whether we should render that person client-side or not - thus we take no action.
        })
    }
  }
  //------------------------------------------------------------
  


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchQuery={searchQuery} handleSetSearchQuery={handleSetSearchQuery} />
      

      <h3>Add new entry</h3>
      <PersonForm handleAdd={handleAdd} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />

      <h3>Numbers</h3>
      <Persons persons={persons} searchQuery={searchQuery} deleteEntry={deleteEntry} />
      
      </div>
  )
}

export default App








