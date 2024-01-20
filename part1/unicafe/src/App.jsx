import { useState } from 'react'

const Display = (props) => {
  return (<div>
    <h1>{props.text}</h1>
  </div>)
}

const Button = (props) => {
  return (<>
    <button onClick={props.onClick}>{props.text}</button>
  </>)
}

const Statistics = (props) => {

  let values = props.values

  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text='good' amount={values.good} />
          <StatisticLine text='neutral' amount={values.neutral} />
          <StatisticLine text='bad' amount={values.bad} />
          <StatisticLine text='all' amount={values.total} />
          <StatisticLine text='average' amount={values.points / values.total} />
          <StatisticLine text='positive' amount={(values.good / values.total) * 100 + "%"} />
        </tbody>
      </table>
    </div>
  )
}

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.amount}</td>
    </tr>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [points, setPoints] = useState(0)
  const [values, setValues] = useState({ good: 0, bad: 0, neutral: 0, total: 0, points: 0 })

  const addGood = () => {
    let updatedGood = good + 1
    console.log('Good added: ', updatedGood)
    setGood(good + 1)
    setTotal(total + 1)
    setPoints(points + 1)

    let newValues = {
      ...values,
      good: good + 1,
      total: total + 1,
      points: points + 1,
    }

    setValues(newValues)


  }

  const addNeutral = () => {
    let updatedNeutral = neutral + 1
    console.log('Neutral added: ', updatedNeutral)
    setNeutral(neutral + 1)
    setTotal(total + 1)
    let newValues = {
      ...values,
      neutral: neutral + 1,
      total: total + 1,
    }
    setValues(newValues)
  }
  const addBad = () => {
    let updatedBad = bad + 1
    console.log('Bad added: ', updatedBad)
    setBad(bad + 1)
    setTotal(total + 1)
    setPoints(points - 1)
    let newValues = {
      ...values,
      bad: bad + 1,
      total: total + 1,
      points: points - 1
    }
    setValues(newValues)
  }

  if (good === 0 && bad === 0 && neutral === 0) {
    return (<div>
      <Display text='give feedback' />
      <Button onClick={addGood} text='good' />
      <Button onClick={addNeutral} text='neutral' />
      <Button onClick={addBad} text='bad' />
      <Display text='statistics' />
      <p>No feedback given</p>
    </div>)
  }

  return (
    <div>
      <Display text='give feedback' />
      <Button onClick={addGood} text='good' />
      <Button onClick={addNeutral} text='neutral' />
      <Button onClick={addBad} text='bad' />
      <Display text='statistics' />
      {/* <Statistics text='good' amount={good} />
      <Statistics text='neutral' amount={neutral} />
      <Statistics text='bad' amount={bad} />
      <Statistics text='all' amount={total} />
      <Statistics text='average' amount={points / total} />
      <Statistics text='positive' amount={(good / total) + "%"} /> */}
      <Statistics values={values} />

    </div>
  )
}

export default App