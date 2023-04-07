const Course = ({ course }) => {
  return(
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      {/* <Total parts_t={course.parts} /> */}
    </>
  )
}

const Header = ({ course }) => (
   <h1>{course}</h1>
)
//notice this is shorthand version, w/o curly braces

const Content = ({ parts }) => {
  return (
    parts.map(part =>
      <Part key={part.id} part={part} />
      )
  )
}

const Part = ({ part }) => {
  return (
    <p>{part.name} {part.exercises}</p>
  )
}

/*
const Total = (props) => {
  return (    
      <p>Number of exercises {props.parts_t[0].exercises + props.parts_t[1].exercises + props.parts_t[2].exercises}</p>
  )
}
*/


const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
    ]
  }

  return <Course course={course} />
}

export default App