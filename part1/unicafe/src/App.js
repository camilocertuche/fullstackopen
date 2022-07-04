import { useState } from "react";

const Header = ({ text }) => <h1>{text}</h1>;

const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;

  const CalcultateAverage = () => {
    const score = good - bad;
    const average = score / total;
    return average;
  };

  const CalculatePositiveFeedbackPercentage = () => {
    const positiveFeedback = good / total;
    return positiveFeedback * 100;
  };

  return (
    <div>
      <p>
        good: {good} <br />
        neutral: {neutral} <br />
        bad: {bad} <br />
        all: {total} <br />
        average: {CalcultateAverage()} <br />
        positive: {CalculatePositiveFeedbackPercentage()}%
      </p>
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClickOnGood = () => {
    setGood(good + 1);
  };

  const handleClickOnNeutral = () => {
    setNeutral(neutral + 1);
  };

  const handleClickOnBad = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <Header text="give feedback" />

      <Button text="good" handleClick={handleClickOnGood} />
      <Button text="neutral" handleClick={handleClickOnNeutral} />
      <Button text="bad" handleClick={handleClickOnBad} />

      <Header text="statistics" />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;