import { useState } from 'react';

const Button = ({onCLickProp, text}) => {

  return <button onClick={onCLickProp}>{text}</button>
}

const StatisticLine = ({text, value}) => {

  return(
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad;
  const average = (good * 1 + bad * -1 + neutral * 0 ) / all;
  const positive = (good * 100 / all);

  return (
    <>
     {all !== 0 && (
      <>
        <h1>statistics</h1>
        <table>
          <tbody>
            <StatisticLine text='good' value={good}/>
            <StatisticLine text='neutral' value={neutral}/>
            <StatisticLine text='bad' value={bad}/> 
            <StatisticLine text='all' value={all}/>
            <StatisticLine text='average' value={average}/> 
            <StatisticLine text='positive' value={`${positive} %`}/>
          </tbody>
        </table>
      </>)}
      
      {all === 0 && (
        <p>No feedback given</p>
      )}
   </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
 
  return (
    <div>
      <h1>give feedback</h1>
      <Button onCLickProp={() => setGood(good + 1)} text='good'/>
      <Button onCLickProp={() => setNeutral(neutral + 1)} text='neutral'/>
      <Button onCLickProp={() => setBad(bad + 1)} text='bad'/>
      <Statistics good={good} bad={bad} neutral={neutral}/>
    </div>
  )
}

export default App