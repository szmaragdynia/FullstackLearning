import Note from './components/Note'
import { useState, useEffect } from 'react'
import noteService from './services/notes'



const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)

  
  //------------------------------------------------------
  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])


  //------------------------------------------------------
  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    }
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote)) 
        setNewNote('')
      })
  }


  //------------------------------------------------------
  const toggleImportance = (id) => {
    const note = notes.find(n => n.id === id) 
    const changedNote = {...note, important: !note.important} 

    noteService
      .update(id,changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => (note.id !== id) ? note : returnedNote))
      })
      .catch(error => {
        alert(`the note ${note.content} was already deleted from server`)
        setNotes(notes.filter(n => n.id !== id)) //if the note with some id was already deleted, we dont want to render it on client side of course
                                                 //if there was error, that means the promise was rejected, that means that event handler in then() did not fire (first arg of then() is onFulfilled, second [which we are not using] is onRejected)
      })                                                               
  }


  //------------------------------------------------------
  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  //------------------------------------------------------
  const notesToShow = showAll ? notes : notes.filter(note => note.important)


  return (
    <div>
      <h1>Notes</h1>
      <button onClick={()=>setShowAll(!showAll)}>Toggle - show {showAll ? 'important' : 'all'}</button>
      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} note={note} toggleImportance={() => toggleImportance(note.id)} /> 
        )}
      </ul>
      <form onSubmit={addNote}>
        <input 
        value={newNote} 
        onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App