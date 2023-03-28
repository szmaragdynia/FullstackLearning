import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))

  const generateRandomIndex = (upperBound) => setSelected(Math.floor(Math.random() * upperBound)) //upperbound is not inclusive, thus the max random int is one less 
  const updatePoints = (index) => { 
    const copy = [...points]
    copy[index] += 1
    setPoints(copy)
  }

  return (
    <>
      <p>{anecdotes[selected]}</p>
      <button onClick={() => generateRandomIndex(anecdotes.length)}>Random next anecdote</button>
      <button onClick={() => updatePoints(selected)}>Vote +1 for this one!</button>
      <p>has {points[selected]} votes.</p>
      {/* console.log(points) */}
    </>
  )
}

export default App