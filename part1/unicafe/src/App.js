import { useState } from "react";

const Header = ({ text }) => <h1>{text}</h1>;

const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const Statistics = ({ good, neutral, bad }) => {
  return (
    <div>
      <p>good: {good}</p>
      <p>neutral: {neutral}</p>
      <p>bad: {bad}</p>
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
