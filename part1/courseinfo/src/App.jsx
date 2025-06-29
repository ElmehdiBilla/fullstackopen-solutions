
const Header = ({course}) => {
    return (
      <h1>{course}</h1>
    )
  }

  const Part = ({name, number}) => {
    return (
      <p>{name} {number}</p>
    )
  }

  const Content = ({parts}) => {
    return (
      <div>
        <Part name={parts[0].name} number={parts[0].exercises}/>
        <Part name={parts[1].name} number={parts[1].exercises}/>
        <Part name={parts[2].name} number={parts[2].exercises}/>
      </div>
    )
  }

  const Total = ({number}) => {
    return (
      <p>Number of exercises {number}</p>
    )
  }

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
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
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts}/>
      <Total number={course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises} />
    </div>
  )
}

export default App