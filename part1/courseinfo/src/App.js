const Header = (props) => (
   <h1>{props.course}</h1>
)
//notice this is shorthand version, w/o curly braces


const Content = (props) => {
  return (
    <>
      <Part part_p={props.parts_c[0]} />
      <Part part_p={props.parts_c[1]} />
      <Part part_p={props.parts_c[2]} />
    </>
  )
}


const Total = (props) => {
  return (    
      <p>Number of exercises {props.parts_t[0].exercises + props.parts_t[1].exercises + props.parts_t[2].exercises}</p>
  )
}


const Part = (props) =>{
  return (
    <p>{props.part_p.name} {props.part_p.exercises}</p>
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
      <Content parts_c={parts} />
      <Total parts_t={parts} />
    </>
  )
}

export default App