import React, { useState, useEffect } from 'react';
import { Todo } from "./types"

function App() {
  const [todos, setTodos] = useState<Todo[]>()

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch("http://127.0.0.1:4000/api/todos/")
        const jsonRes = await res.json()
        console.log(jsonRes)
        setTodos(jsonRes)
      } catch (err) {
        console.error(err)
      }
    }
    getData()
  }, [])


  return (
    <div className="App">

      Edit <code>src/App.tsx</code> and save to reload.

    </div>
  );
}

export default App;
