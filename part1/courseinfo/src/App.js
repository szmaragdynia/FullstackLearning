const Header = (props) => (
   <h1>{props.course}</h1>
)
//notice this is shorthand version, w/o curly braces


const Content = (props) => {
  return (
    <>
      <Part part={props.part1c} />
      <Part part={props.part2c} />
      <Part part={props.part3c} />
    </>
  )
}


const Total = (props) => {
  return (    
      <p>Number of exercises {props.part1t.exercises + props.part2t.exercises + props.part3t.exercises}</p>
  )
}


const Part = (props) =>{
  return (
    <p>{props.part.name} {props.part.exercises}</p>
  )
}


const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10,
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <>
      <Header course={course} />
      <Content part1c={parts[0]} part2c={parts[1]} part3c={parts[2]} />
      <Total part1t={parts[0]} part2t={parts[1]} part3t={parts[2]} />
    </>
  )
}

export default App