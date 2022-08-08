import { useState } from "react";

/** 1.10 */
const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}> {text} </button>;
};

/** 1.10 */
const StatisticLine = ({ text, value }) => {
  if (text === "positive") {
    return (
      <tr>
        <td> {text} </td>
        <td> {value} % </td>
      </tr>
    );
  }

  return (
    <tr>
      <td> {text} </td>
      <td> {value} </td>
    </tr>
  );
};

/** 1.8 - 1.9, 1.11 */
const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = (good - bad) / total;
  const positive = (good / total) * 100;

  if (total === 0) {
    return <p>No feedback given</p>;
  }

  return (
    <>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="total" value={total} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={positive} />
        </tbody>
      </table>
    </>
  );
};

/////
const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1> give feedback </h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />

      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
