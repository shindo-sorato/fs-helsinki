import { useState } from 'react'

const Button = (props) => {
  return (<>
    <button onClick={props.onClick}>{props.text}</button>
  </>)
}

const Display = (props) => {
  return (<>
    <h1>{props.text}</h1>
    </>)
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)

  const [votes, setVotes] = useState({ "0": 0, "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, '6': 0, "7": 0 })

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max)
  }

  const setIndex = () => {
    const theNum = getRandomInt(anecdotes.length)
    console.log("Generated number: ", theNum)
    console.log("Votes: ", votes)
    setSelected(theNum)
  }

  const selectAndVote =
    (index) => {
      console.log(index)
      return () => {
        const newVotes = { ...votes }
        newVotes[index] += 1
        console.log(newVotes)
        setVotes(newVotes)
      }
    }

  const getTheMostVotes = () =>{
    let most = votes[0];
    let idx = 0;
    for (let i = 0; i < anecdotes.length; i++){
      if (votes[i] > most){
        most = votes[i]
        idx = i
      }
    }
    return idx
  }


  return (
    <div>
      <Display text="Anecdote of the day"/>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <div>
        <Button onClick={setIndex} text='next anecdote' />
        <Button onClick={selectAndVote(selected)} text='vote' />
      </div>
      <Display text="Anecdote with most votes"/>
      <p>{anecdotes[getTheMostVotes()]}</p>
      <p>has {votes[getTheMostVotes()]} votes</p>
    </div>
  )
}

export default App