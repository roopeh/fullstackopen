import React, { useState } from 'react'

const Header = ({ name }) => <h1>{name}</h1>
const Button = ({ name, click }) => <button onClick={click}>{name}</button>
const StatisticsLine = ({ name, value, extra }) => <tr><td>{name}</td><td>{value}</td><td>{extra}</td></tr>

const Statistics = ({ feedback }) => {
  const { good, neutral, bad } = feedback
  const totalAmount = good + neutral + bad
  
  const calcAverage = () => ((good * 1) + (bad * -1)) / totalAmount
  const calcPositive = () => good / totalAmount * 100

  if (totalAmount == 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }

  return (
    <div>
      <table>
        <tbody>
          <StatisticsLine name="good" value={good} />
          <StatisticsLine name="neutral" value={neutral} />
          <StatisticsLine name="bad" value={bad} />

          <StatisticsLine name="all" value={totalAmount} />
          <StatisticsLine name="average" value={calcAverage()} />
          <StatisticsLine name="positive" value={calcPositive()} extra="%" />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  const [feedbacks, setFeedbacks] = useState({ good: 0, neutral: 0, bad: 0 })

  const addGood = () => setFeedbacks(feedbacks => ({ ...feedbacks, good: feedbacks.good + 1 }))
  const addNeutral = () => setFeedbacks(feedbacks => ({ ...feedbacks, neutral: feedbacks.neutral + 1}))
  const addBad = () => setFeedbacks(feedbacks => ({ ...feedbacks, bad: feedbacks.bad + 1 }))

  return (
    <div>
      <Header name="give feedback" />
      <Button name="good" click={addGood} />
      <Button name="neutral" click={addNeutral} />
      <Button name="bad" click={addBad} />

      <Header name="statistics" />
      <Statistics feedback={feedbacks} />
    </div>
  )
}

export default App;
