import { useState } from 'react'

const Display = (props) => {
  return (
    <>
      <p>good {props.good}</p>
      <p>neutral {props.neutral}</p>
      <p>bad {props.bad}</p>
    </>
  )
}

const Statistics = (props) => {
  if (props.total === 0) {
    return (
      <>
        <p>all {props.total}</p>
        <p>average n/d</p>
        <p>positive n/d</p>
      </>
    )  
  }
  return (
    <>
      <p>all {props.total}</p>
      <p>average {(props.good - props.bad)/props.total }</p>
      <p>positive {props.good*100/props.total}%</p>
    </>
  )
} 

const Button = (props) => <button onClick={props.handleClick}>{props.text}</button>


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const handleClickGood = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
    setTotal(updatedGood + neutral + bad)
  }
  const handleClickNeutral = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    setTotal(good + updatedNeutral + bad)
  }
  const handleClickBad = () =>{
    const updatedBad = bad + 1
    setBad(updatedBad)
    setTotal(good + neutral + updatedBad)
  } 

  return (
    <div>
      <h2>give feedback</h2>
      <Button handleClick={handleClickGood} text='good' />
      <Button handleClick={handleClickNeutral} text='neutral' />
      <Button handleClick={handleClickBad} text='bad' />
      <h2>statistics</h2>
      <Display good={good} neutral={neutral} bad={bad} total={total} />
      <Statistics good={good} bad={bad} total={total} />
    </div>
  )
}

export default App