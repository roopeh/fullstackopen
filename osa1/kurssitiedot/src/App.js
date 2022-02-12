import React from 'react'

const Header = (header) => <h1>{header.name}</h1>

const Part = (part) => <p>{part.name} {part.amount}</p>

const Content = (data) => {
  return (
    <div>
      <Part name={data.parts[0].name} amount={data.parts[0].exercises} />
      <Part name={data.parts[1].name} amount={data.parts[1].exercises} />
      <Part name={data.parts[2].name} amount={data.parts[2].exercises} />
    </div>
  )
}

const Total = (data) => <p>Number of exercises {data.parts[0].exercises + data.parts[1].exercises + data.parts[2].exercises}</p>

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
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App
