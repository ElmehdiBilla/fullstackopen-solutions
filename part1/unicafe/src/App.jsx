import { useState } from 'react'

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({text,value}) => {
  return <p>{text} {value}</p>
}

const Statistics = ({good,neutral,bad}) => {

  const all = good + neutral + bad;
  const average = (good * 1 + neutral * 0 + bad * -1) / all;
  const positive = (good / all) * 100;

  return (
    <>
      <h1>statistics</h1>

      {
        !good && !neutral && !bad ?
        <p>No feedback given</p>
        :
        <>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={positive+" %"} />
        </>
      }
    </>
  )
}


const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <h1>give feedback</h1>

      <Button onClick={() => setGood(prev => prev+1)} text="good"/>
      <Button onClick={() => setNeutral(prev => prev+1)}  text="neutral"/>
      <Button onClick={() => setBad(prev => prev+1)}  text="bad"/>
      
      <Statistics 
        good={good} 
        neutral={neutral}
        bad={bad}
        />
      
    </>
  )

}

export default App