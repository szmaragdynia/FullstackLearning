{/* leaving this because it marks important understading point for me, but we are changing it 
const App = (props) => {
  //const counter = props.counter //either this way (because cant render objects!) or as below:
  const {counter} = props //counter = props would make 'counter' reference to 'props' object - now we take 
                          //the first[and here only] property 'props' is holding, and assigning it into 'counter' using destructurization

*/}

import { useState } from 'react'

const App = () => {
  const [counter, setCounter] = useState(0)
  

  
  setTimeout(
    () => 
  )
  return (
  )
}

export default App