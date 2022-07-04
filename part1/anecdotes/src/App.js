import { useState } from "react";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Anecdote = ({ title, description, votes }) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>
        {description} <br /> has {votes} votes
      </p>
    </div>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  ];

  const INITIAL_VOTES = Array.apply(null, new Array(anecdotes.length)).map(
    Number.prototype.valueOf,
    0
  );

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(INITIAL_VOTES);
  const mostVotedIndex = votes.indexOf(Math.max(...votes));

  const handleClick = () => {
    const index = Math.floor(Math.random() * anecdotes.length);
    setSelected(index);
  };

  const handleVote = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
  };

  return (
    <div>
      <Anecdote
        title="Anecdote of the day"
        description={anecdotes[selected]}
        votes={votes[selected]}
      />

      <Button text="vote" handleClick={handleVote} />
      <Button text="next anecdote" handleClick={handleClick} />

      <Anecdote
        title="Anecdote with most votes"
        description={anecdotes[mostVotedIndex]}
        votes={votes[mostVotedIndex]}
      />
    </div>
  );
};

export default App;
