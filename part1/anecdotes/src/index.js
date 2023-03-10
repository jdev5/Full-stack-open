import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;
const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [mostVotes, setMostVotes] = useState(0)
  const [votes, setVotes] = useState(anecdotes.map(_ => 0))
  
  const RandomPhrase = () => {
    while (true) {
      const random = Math.floor(Math.random() * anecdotes.length)
      if (random !== selected) return random
    }
  }
  const changePhraseValue = () => {
    setSelected(RandomPhrase())
  }

  const voteSelected = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)

    if (newVotes[selected] > votes[mostVotes]) {
      setMostVotes(selected)
    }
  }

  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <div>has {votes[selected]} votes</div>
      <div>
        <Button onClick={voteSelected} text="Vote"/>
        <Button onClick={changePhraseValue} text="Next Anecdote"/>
      </div>
      <div>
      <h2>Anecdote with the most votes</h2>
      <div>{anecdotes[mostVotes]}</div>
      <div>has {votes[mostVotes]} votes</div>
      </div>
      
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
