import React, { useState, useEffect } from 'react';
import { Todo } from "./types"

function App() {
  const [todos, setTodos] = useState<Todo[]>()
const [currentTodo, setCurrentTodo] = useState<Todo>({ title: "", body: "", done: false });

  const getData = async () => {
    try {
      const res = await fetch("http://127.0.0.1:4000/api/todos/")
      const jsonRes = await res.json()
      setTodos(jsonRes)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const handleChange = (e: {
    target: {
      name: any; value: any;
    };
  }) => {
    setCurrentTodo({ ...currentTodo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    await fetch("http://127.0.0.1:4000/api/todos/", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(currentTodo)
    });
    getData()
  };


  return (
    <div className="App">
      <ul>
        {
          todos?.map((todo, index) => (
            <li key={index}>
              {todo.title} - {todo?.body} -{todo.done ? "Done" : "Not Done"}
            </li>
          ))
        }
      </ul>

      <form onSubmit={handleSubmit}>
        <input type="text" name="title" id="title" onChange={handleChange} />
        <input type="text" name="body" id="body" onChange={handleChange} />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
}

export default App;
