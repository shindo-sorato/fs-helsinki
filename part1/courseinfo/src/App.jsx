const Header = (props) => {
  console.log("header props")
  console.log(props)
  return (<div>
    <h1>{props.course}</h1>
  </div>)
}

const Content = (props) => {
  console.log("content props")
  console.log(props)
  return (<div>
    <Part name={props.courses[0].name} exercises={props.courses[0].exercises} />
    <Part name={props.courses[1].name} exercises={props.courses[1].exercises} />
    <Part name={props.courses[2].name} exercises={props.courses[2].exercises} />
  </div >
  )

}

const Part = (props) => {
  return (<div>
    <p>{props.name} {props.exercises}</p>
  </div>)
}

const Total = (props) => {
  let total = 0
  props.courses.forEach(i => total += i.exercises)

  return (
    <div>
      <p>Number of exercises {total}</p>
    </div>
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
      <Content courses={course.parts} />
      <Total courses={course.parts} />
    </div>
  )
}

export default App