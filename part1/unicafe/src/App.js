import { useState } from 'react'


const Statistics = (props) => {
  // I don't need 'total' state, because if good,bad,neutral states are correct at the point of adding them etc., then the variable consisting of them will be as well.
  const total = props.good + props.neutral + props.bad
  console.log(total)
  if (total === 0) {
    return <p>No feedback given</p>
  }
  return (
    <table>
      <tbody>
        <StatisticLine text='good' value={props.good} />
        <StatisticLine text='neutral' value={props.neutral} />
        <StatisticLine text='bad' value={props.bad} />
        <StatisticLine text='total' value={total} />
        <StatisticLine text='average' value={(props.good - props.bad)/total} />
        <StatisticLine text='positive' value={(props.good*100 / total) +' %'} />
      </tbody>
    </table>
  )
} 
const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}
const Button = (props) => <button onClick={props.handleClick}>{props.text}</button>


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClickGood = () => setGood(good + 1)
  const handleClickNeutral = () => setNeutral(neutral + 1)
  const handleClickBad = () => setBad(bad + 1)

  return (
    <div>
      <h2>give feedback</h2>
      <Button handleClick={handleClickGood} text='good' />
      <Button handleClick={handleClickNeutral} text='neutral' />
      <Button handleClick={handleClickBad} text='bad' />
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App