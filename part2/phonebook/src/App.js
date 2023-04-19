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

const Notification = ({ message, valence }) => {
  if (message === null) {
    return null
  }
  
  return (
    <div className={`notification${valence}`}> {message} </div>
  )
}

const App = () => {
  //-----state-----------------------------------------
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [notification, setNotification] = useState(null)
  const [valence, setValence] = useState('Informative') //for use with notification:Positive, Negative, Informative (also acting as placeholder)
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
        .update(existingPerson.id,changedPerson) 
        .then(returnedPerson => {
          setPersons(persons.map(prsn => prsn.id !== existingPerson.id ? prsn : returnedPerson))
          setValence('Positive')
          setNotification(`Successfully changed number`)
          setTimeout( ()=> setNotification(null), 5000)
          setTimeout( ()=> setValence('Informative'), 5000)
        }).catch(error => {
          setValence('Negative')
          setNotification(`Cannot change number of ${changedPerson.name}`)
          setTimeout( ()=> setNotification(null), 5000)
          setTimeout( ()=> setValence('Informative'), 5000)
        })
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

        setValence('Positive')
        setNotification(`Successfully added ${returnedPerson.name}`)
        setTimeout( ()=> setNotification(null), 5000)
        setTimeout( ()=> setValence('Informative'), 5000)
      })
      .catch(error => {
        setValence('Negative')
        setNotification(`Cannot add person ${newPerson.name}`)
        setTimeout( ()=> setNotification(null), 5000)
        setTimeout( ()=> setValence('Informative'), 5000)
      })
  }

  const handleAdd = (event) => {
    event.preventDefault()
    const existingPerson = persons.find( person => person.name === newName.trim() )
    if(existingPerson) {
      if(existingPerson.number === newNumber.trim()) {
        alert(`${existingPerson.name} with number ${existingPerson.number} is already added to phonebook. You can swap the number or add another person.`) 
        return;
      } 
      else { changeNumber(existingPerson) }
    }
    else { addPerson() }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSetSearchQuery = (event) => {
    setSearchQuery(event.target.value)
  }

  const deleteEntry = id => {
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
      <Notification message={notification} valence={valence}/>
      <Filter searchQuery={searchQuery} handleSetSearchQuery={handleSetSearchQuery} />
      

      <h3>Add new entry</h3>
      <PersonForm handleAdd={handleAdd} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />

      <h3>Numbers</h3>
      <Persons persons={persons} searchQuery={searchQuery} deleteEntry={deleteEntry} />
      
      </div>
  )
}

export default App








