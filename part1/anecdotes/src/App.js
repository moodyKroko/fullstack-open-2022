import { useState } from "react";

//TODO: 1.14*: anecdotes step2

//
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

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  const vote = (selected) => {
    // copy 0 upto 'selected' elements,
    // change the selected element,
    // copy from 'selected + 1' element till the end of array and return a new update array
    setVotes((items) => {
      return [...items.slice(0, selected), items[selected] + 1, ...items.slice(selected + 1)];
    });
  };

  const randomAnecdote = () => {
    const maxNum = anecdotes.length;
    const randomNum = Math.floor(Math.random() * maxNum);

    setSelected(randomNum);
  };

  console.log(selected);
  console.table(votes);

  return (
    <div>
      {anecdotes[selected]}
      <br />
      has {votes[selected]} votes
      <br />
      <button onClick={() => vote(selected)}> vote </button>
      <button onClick={() => randomAnecdote()}> next anecdote </button>
    </div>
  );
};

export default App;
