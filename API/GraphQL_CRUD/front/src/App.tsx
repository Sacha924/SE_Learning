import React from 'react';
import { Todo } from './types';
import DisplayTodo from './components/DisplayTodo';
import { useQuery } from 'urql'
import { GetTodosDocument } from './graphql/generated'

function App() {
  const [results] = useQuery({
    query: GetTodosDocument
  })

  return (
    <div className="App">
      <p> hello </p>
      {results.data?.todos?.map((todo, key)=>{
        return(<DisplayTodo todo={todo} key = {key}/>)
      })}
    </div>
  );
}

export default App;
