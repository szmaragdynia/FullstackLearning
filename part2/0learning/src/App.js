import Note from './components/Note'
import { useState, useEffect } from 'react'
import axios from 'axios';


//1 rendering app component 2. effect is executed immediately after rendering 3.setnotes makes App() re-render
const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)


  useEffect(() => {
    console.log('effect')
    axios
      .get('https://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled')
        setNotes(response.data)
      })
  }, [])
  console.log('render', notes.length, 'notes')


  const addNote = (event) => {
    event.preventDefault()
    console.log('button clicked in <form onSubmit={addNote}> - event.target', event.target)
    const noteObject = {
      id: notes.length + 1, //ok because we never delete
      content: newNote,
      important: Math.random() < 0.5,
    }
    setNotes(notes.concat(noteObject))
    setNewNote('')
  }


  const handleNoteChange = (event) => {
    console.log(" onChange={handleNoteChange} - event.target: ", event.target)
    console.log(event.target.value)
    setNewNote(event.target.value)
  }


  const notesToShow = showAll ? notes : notes.filter(note => note.important)
  //... . filter(note => note.important === true - The comparison operator is redundant, since the value of note.important is either true or false,


  return (
    <div>
      <h1>Notes</h1>
      <button onClick={()=>setShowAll(!showAll)}>Toggle - show {showAll ? 'important' : 'all'}</button>
      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} note={note} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input 
        value={newNote} 
        onChange={handleNoteChange}
        //The event handler is called every time a change occurs in the input element.
        />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App


/* 
chatGPT

In React, a "controlled input" is an input element whose value is controlled by the React component's state. In contrast, an "uncontrolled input" is an input element whose value is managed by the DOM itself.

The main difference between these two approaches is that with a controlled input, React is responsible for keeping track of the input's value, and updating it as necessary based on user input or other events. In contrast, with an uncontrolled input, the DOM is responsible for managing the input's value, and React simply reads the current value when needed.

Here's an example of an uncontrolled input:

graphql

<input type="text" defaultValue="Initial value" />

In this case, React renders the input element with an initial value of "Initial value", but after that, it has no control over the input's value. If the user types something into the input field, the value will be updated by the DOM, but React will not be aware of this change.
*/

/*
BING
The main difference is that in the uncontrolled input, you get the value of the input when you need it (for example, when you click the button), while in the controlled input, you always have the current value of the input in the state.

The advantages of using controlled inputs are that you can easily validate, manipulate, or format the input value before storing it in the state. You can also use other state values or props to control the input value dynamically. For example, you can disable or enable the input based on some condition3.
*/