import { useState } from 'react'

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

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
          <p>good {good}</p>
          <p>neutral {neutral}</p>
          <p>bad {bad}</p>
          <p>all {all}</p>
          <p>average {average}</p>
          <p>positive {positive} %</p>
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