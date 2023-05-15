//this can and should be considered learning9-3
import { useState } from 'react'

//The History component renders completely different React elements depending on the state of the application. This is called conditional rendering.
const History = (props) => {
  if (props.allClicksH.length === 0) {
    return (
      <div>The app is used by pressing the buttons</div>
    )
  }
  return (
    <div>Button press history: {props.allClicksH.join(' ')}</div>
  )
}

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const App = () => {
  const [clicks, setClicks] = useState({left: 0, right: 0})
  const [allClicks, setAll] = useState([])
  //const [total, setTotal] = useState(0)
  
  //console.log('Rendering app and now writing "+clicks": ' + clicks + ' and now writing "clicks,":', clicks)
  //I swear I chedked the above somewhere (I did not know back then about the ',', but I cannot find it. Ah, the usefulness of my code-notes...:|)

  //concat method, does not mutate the existing array but rather returns a new copy of the array with the item added to it.
  //"allClicks.push('L')" appears to work HOWEVER THIS MUTATES THE STATE DIRECTLY - don't do this unless you want very hard debugging (and bad code)
  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    const updatedLeft = clicks.left + 1 //this was necessary for 'total' state
    setClicks({...clicks, left: updatedLeft})
    {/* setTotal(updatedLeft + clicks.right) */}
  }
  //state update in React happens asynchronously, i.e. not immediately but "at some point" before the component is rendered again.
    //this is why adding the number of clicks of the right and left button: "setTotal(clicks.left + clicks.right)"
    //after the line supposedlely updating the state: "setClicks({...clicks, left: clicks.left + 1})"
    //results in a number one less - that is the amount correct but to the previous state! - the state was not updated in that line, it will happen...at some time.

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    const updatedRight = clicks.right + 1 //this was necessary for 'total' state
    setClicks({...clicks, right: updatedRight})
    {/* setTotal(clicks.left + updatedRight) */}
  }

  //""{...clicks, right: clicks.right + 1}" creates a copy of the clicks object where the value of the right property is increased by one."

  //1. React FORBIDS mutating state directly, I mustn't do: "clicks.left++" (even with "setClicks(clicks)" afterwards, it is still wrong)
  //2. thus we must mutate a copy and then change state, which we did.
  //3. If I change only few properties, I can thankfully not have to write all the other like property1: clicks.property1, but I can use SPREAD SYNTAX (...stuff):
    /*"Spread syntax looks exactly like rest syntax. In a way, spread syntax is the opposite of rest syntax. Spread syntax "expands" an array into its elements, 
    while rest syntax collects multiple elements and "condenses" them into a single element."*/

  //"Storing all of the state in a single state object is a bad choice for this particular application; there's no apparent benefit and the resulting application is a lot more complex."
  //However I wanted to learn that by writing this, so it stays because what else now, comment it out? It would clutter the space

  //debugger

  return (
    <>
      {clicks.left}
      <Button handleClick={handleLeftClick} text='left' />
      <Button handleClick={handleRightClick} text='right' />    
      {clicks.right}
      <History allClicksH = {allClicks} />
    </>
  )
}

export default App
