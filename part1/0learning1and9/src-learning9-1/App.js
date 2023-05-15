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
  const [timeCounter, setTimeCounter] = useState(0)
  const [buttonCounter, setButtonCounter] = useState(0)
  
  //to setTimeout we pass 2 parameters: function to increment the counter STATE, and a timeout of one second.
    //OK BUT WHERE IS setCounter DEFINITION? look here: https://react.dev/reference/react/useState#setstate
      //"set functions, like setSomething(nextState)"; IT DOES NOT HAVE TO BE NAMED 'SETSTUFF' IT CAN BE ANYTHING omg.
      //"The set function returned by useState lets you update the state to a different value and trigger a re-render."
        //basically what is says is: you have a STATE and you need a setSTATE function to set state to different value, 
          //just type it (or pass a function - some requirements apply)
  setTimeout(
    () => setTimeCounter(timeCounter + 1),
      1000
  )
  //when the state modifying function setCounter is called, REACT RE-RENDERS THE COMPONENT=function body of the component function gets re-executed
    //then useState function return the new value of the state:1 (and so on with every re-render)
  
  console.log('rendering counter...', timeCounter)
  console.log('rendering counterButton...', buttonCounter)
   
  const increaseByOne = () => setButtonCounter(buttonCounter + 1)
  const setToZero = () => setButtonCounter(0)

  return (
    <>
      <div>Counter: {timeCounter}</div>
      <div>counterButton: {buttonCounter}</div>

      <button onClick={increaseByOne}> 
        plus
      </button> 
      <button onClick={setToZero}>
        zero
      </button>
    </>
  )
}


//"We define the event handlers for our buttons where we declare their onClick attributes" (onClick is an attribute, it defines what happens when the button is clicked)
//onClick={} must get (event handler is supposed to be) either a function or function reference
  //so this would work: "<button onClick={() => setButtonCounter(buttonCounter + 1)}>"  
  //so this would NOT work (its f. call): "<button onClick={setButtonCounter(buttonCounter + 1)}>"
    /* 
    The difference is subtle. In the first example, the anonymous function calling setButtonCounter is passed as an onClick event handler.
    This tells React to remember it and only call your function when the user clicks the button.
    ---
    In the second example, function in the {} is fired immediately during rendering, without any clicks, because JavaScript inside the JSX { and } executes right away.
     
    EDITED to apply to my example and taken from: https://react.dev/learn/responding-to-events
    */
  //additionaly this would work: "const asd = () => {setButtonCounter(buttonCounter +1)};" " <button onClick={asd}>"
  //but this would not work: "const asd = setButtonCounter(buttonCounter +1);"
    //probably because this is per se ref. to f. call, not f. while the former is ref. to f., which makes f. call. I dunno if js "differentiates" this. Leaving for now...
  
//"Usually defining event handlers within JSX-templates is not a good idea. Here it's ok, because our event handlers are so simple." (we separated them into separate ff anyway)
  
/* additional explanation:
<button onClick={console.log('clicked the button')}>
  button
</button>
...The issue here is that our event handler is defined as a function call which means that the event 
handler is assigned the returned value from the function, which in the case of console.log is undefined.

The fact that react hooks get there in loop:
<button onClick={setValue(0)}>button</button>
 When the component is rendered the function setValue(0) gets executed which in turn causes the component to be re-rendered.
 Re-rendering in turn calls setValue(0) again, resulting in an infinite recursion.
*/

export default App