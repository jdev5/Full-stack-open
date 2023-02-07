import React, { useState } from "react";
import ReactDOM from "react-dom";

const title = "Give us feedback";
const staticstis = "Staticstis";

const Header = () => <h1>{title}</h1>;

const Data = () => <h2>{staticstis}</h2>;

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;
const History = (props) => {
  if (props.allClicks.length === 0) {
    return <div>No feedback given</div>;
  }

  return (
    <div>
      <p>Good: {props.good}</p>
      <p>Neutral: {props.neutral}</p>
      <p>Bad: {props.bad}</p>
      <p>All: {props.allClicks.reduce((a, b) => a + b, 0)}</p>
      <p>Average: {props.average}</p>
      <p>Positive: {props.positive}%</p>
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [allClicks, setAll] = useState([]);

  const handleGoodClick = () => {
    setAll(allClicks.concat(1));
    setGood(good + 1);
  };
  const handleNeutralClick = () => {
    setAll(allClicks.concat(1));
    setNeutral(neutral + 1);
  };
  const handleBadClick = () => {
    setAll(allClicks.concat(1));
    setBad(bad + 1);
  };

  return (
    <div>
      <Header />
      <Button onClick={handleGoodClick} text="Good" />
      <Button onClick={handleNeutralClick} text="Neutral" />
      <Button onClick={handleBadClick} text="Bad" />
      <Data />
      <History
        good={good}
        neutral={neutral}
        bad={bad}
        allClicks={allClicks}
        average={good - bad / 3}
        positive={(good / allClicks.length) * 100}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
