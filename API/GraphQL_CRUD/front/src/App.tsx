import React, { useState } from 'react';
import DisplayTodo from './components/DisplayTodo';
import { useQuery } from 'urql'
import { GetTodosDocument } from './graphql/generated'
import CreateTodo from './components/CreateTodo';

function App() {
  const [results] = useQuery({
    query: GetTodosDocument
  })
  const [showForm, setShowForm] = useState(false)
  const [buttonMessage, setButtonMessage] = useState("Add Todo")

  return (
    <div className="App">
      <p> List of Todos : </p>
      {results.data?.todos?.map((todo, key) => {
        return (<DisplayTodo todo={todo} key={key} />)
      })}

      <button onClick={() => {
        setShowForm(!showForm)
        setButtonMessage(showForm ? 'Add Todo' : 'Close Form');
      }}>{buttonMessage}</button>

      {showForm && <CreateTodo />}
    </div>
  );
}

export default App;
