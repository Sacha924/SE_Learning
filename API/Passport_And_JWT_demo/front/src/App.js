import './App.css';
import { useState } from "react";

function App() {
  const [actionMessage, setActionMessage] = useState('Register');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = actionMessage === 'Register' ? await register() : await login();
    console.log(response); // Handle response
  }

  const register = async () => {
    const response = await fetch('http://localhost:4000/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    return await response.json();
  }

  const login = async () => {
    const response = await fetch('http://localhost:4000/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    return await response.json();
  }

  const toggleAction = () => {
    setActionMessage(prev => prev === 'Register' ? 'Login' : 'Register');
  }

  return (
    <div className="App">
      <button onClick={toggleAction}>
        Switch to {actionMessage === 'Register' ? 'Login' : 'Register'}
      </button>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <input type="submit" value={actionMessage} />
      </form>
    </div>
  );
}

export default App;
