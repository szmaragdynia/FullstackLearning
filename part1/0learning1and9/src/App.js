//the file imports the useState function
import { useState } from 'react'

{/* leaving this because it marks important understading point for me, but we are changing it 
const App = (props) => {
  //const counter = props.counter //either this way (because cant render objects!) or as below:
  const {counter} = props //counter = props would make 'counter' reference to 'props' object - now we take 
                          //the first[and here only] property 'props' is holding, and assigning it into 'counter' using destructurization

*/}



const App = () => {
  //the useState function call adds STATE to the component and "renders it initialized with the value of zero" (=initializes it with zero?)
  //the useState function returns an array that contain two items. We assign the items to the variables using destructuring assignment syntax.
  //the counter variable is assigned the initial value of STATE which is zero. 
    //the setCounter variable  is assigned to a function (insidely?) that will be used to MODIFY THE STATE.
  const [counter, setCounter] = useState(0)
  

  //to setTimeout we pass 2 parameters: function to increment the counter STATE, and a timeout of one second.
            //OK BUT WHERE IS setCounter DEFINITION? look here: https://react.dev/reference/react/useState#setstate
              //"set functions, like setSomething(nextState)";
              //"The set function returned by useState lets you update the state to a different value and trigger a re-render."
                //basically what is says is: you have a STATE and you need a setSTATE function to set state to different value, 
                  //just type it (or pass a function - some requirements apply)

  setTimeout(
    () => setCounter(counter + 1),
      1000
  )
  //when the state modifying function setCounter is called, REACT RE-RENDERS THE COMPONENT=function body of the component function gets re-executed
    //then useState function return the new value of the state:1 (and so on with every re-render)
  
  console.log('rendering...', counter)
  
  return (
    <div>{counter}</div>
  )
}

export default App