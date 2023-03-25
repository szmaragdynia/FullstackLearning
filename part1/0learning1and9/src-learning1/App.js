//this filie has been changed even after 0-8, then we implemented guessing the year and used destructurization.

const Hello = ({name,age}) => {
  //const name = props.name
  //const age = props.age
  //this above equals to the below:
  //const {name, age} = props
  //but instead of assigning fetched object props into props variable, and then its properties into name and age variables,
  //we can omit the first step and just move the above into the function argument
  const bornYear = () => new Date().getFullYear() - age
  
  return (
    <>
      <p>Hello {name}, you are {age} years old.</p>
      <p>So you were probably born in {bornYear()}</p>
    </>  
  )
}

const App = () => {
  const name = 'Peter'
  const age = 10

  return (
  <>
    <h1>Greetings</h1>
    <Hello name='Maya' age={26 + 10} />
    <Hello name={name} age={age} />
  </>
  )
}

export default App