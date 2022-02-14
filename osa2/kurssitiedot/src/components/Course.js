const Course = ({ course }) => {
    return (
      <div>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
}

const Header = ({ name }) => <h3>{name}</h3>

const Part = ({ name, amount }) => <p>{name} {amount}</p>

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part =>
        <Part key={part.id} name={part.name} amount={part.exercises} />
      )}
    </div>
  )
}

const Total = ({ parts }) => {
  const result = parts.reduce((previous, current) => current.exercises + previous, 0)

  return (
    <p>
      <b>total of {result} exercises</b>
    </p>
  )
}

export default Course
