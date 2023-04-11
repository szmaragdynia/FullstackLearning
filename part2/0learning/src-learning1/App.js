import Note from './components/Note'


const App = ({ notes }) => {
  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note => 
          <Note key={note.id} note={note} />
        )}
      </ul>
    </div>
  )
}

export default App

//Note that your components won’t receive key as a prop. It’s only used as a hint by React itself. If your component needs an ID, you have to pass it as a separate prop: <Profile key={id} userId={id} />.
//source: https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key
  //Look, either A:
    /*
    <ul>
      {notes.map(note => 
        <li key={note.id}>
          {note.content}
        </li>
      )}
    </ul>
    */
  
  //or B:
  /*
  const Note = ({ note }) => {
    return (
      <li> {note.content} </li>
    )
  }

  const App = ....
    ....
    <ul>
    {notes.map(note => 
      <Note key={note.id} note={note} />
    )}
  */
