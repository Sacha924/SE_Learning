import React from 'react';
import { Todo } from './types';
import DisplayTodo from './components/DisplayTodo';

function App() {
  const Todos: Todo[] = [
    {
      title: "Learn React",
      content: "Learn React",
      done: false
    },
    {
      title: "Learn GraphQL",
      content: "Learn GraphQL",
      done: false
    },
    {
      title: "Pro leetcoder",
      content: "Become a pro at leetcode",
      done: true
    }
  ];

  return (
    <div className="App">
      {Todos.map((todo)=>{
        return(<DisplayTodo todo={todo} />)
      })}
    </div>
  );
}

export default App;
