const Course = ({ course }) => {
    return(
      <>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts_t={course.parts} />
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


const Total = ({ parts_t }) => {
    const total = parts_t.reduce(
      (sum,el) => {
        console.log("1st console.log: ", sum)
          return sum + el.exercises
      }, 
      0
      );
    return (    
        <p>Number of exercises {total}</p>
    )
}

export default Course