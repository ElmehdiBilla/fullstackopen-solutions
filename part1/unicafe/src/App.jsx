import { useState } from 'react'

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>


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
      
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </>
  )
}

export default App