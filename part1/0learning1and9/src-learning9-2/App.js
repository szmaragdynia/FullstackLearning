//this can and should be considered learning9-2

//"It's recommended to write React components that are small and reusable across the application and even across projects."
//this part reflects changes made in part1c - "passing state" - we refactored code, also I deleted timer counter, because we got rid of it when we implemented buttons, but I had not deleted it back then.
//"However, be careful to not oversimplify your components, as this makes adding complexity a more tedious task down the road."
import { useState } from 'react'


//Display component that's responsible for displaying the value of the counter.
//if not for destructuring, it would be: (props)-> {props.counter}
const Display = ({ counter }) => <div>{counter}</div>

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

//"One best practice in React is to lift the state up in the component hierarchy. The documentation says:
  //'Often, several components need to reflect the same changing data. We recommend lifting the shared state up to their closest common ancestor.'"
//So let's place the application's state in the App component and pass it down to the Display component through props.
const App = () => {
  const [counter, setcounter] = useState(0)
  console.log('rendering with counter value', counter)
   
  const increaseByOne = () => {
    console.log('increasing, value before', counter)
    setcounter(counter + 1)
  }
  const decreaseByOne = () => {
    console.log('decreasing, value before', counter)
    setcounter(counter - 1)
  }
  const setToZero = () => {
    console.log('resetting to zero, value before', counter)
    setcounter(0)
  }

  return (
    <>
      <Display counter={counter} />
      <Button handleClick={increaseByOne} text='plus' />
      <Button handleClick={setToZero} text='zero' />
      <Button handleClick={decreaseByOne} text='minus' />
    </>
  )
}

export default App