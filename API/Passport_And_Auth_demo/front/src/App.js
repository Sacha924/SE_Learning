import './App.css';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function App() {
  const [actionMessage, setActionMessage] = useState('Login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMess, setErrorMess] = useState()
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    actionMessage === 'Register' ? await register() : await login();
  }

  const register = async () => {
    const response = await fetch('http://localhost:4000/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) {
      setErrorMess("Network response was not OK :", response);
    }
    else console.log("successfully register")
  }

  const login = async () => {
    const response = await fetch('http://localhost:4000/user/login', {
      method: 'POST',
      credentials: 'include', // Important: include credentials for cookies
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    console.log(await response.json())
    if (!response.ok) {
      setErrorMess("Network response was not OK :", response);
    }
    else {
      navigate('/main')
    }
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

      <a href="http://localhost:4000/user/login/facebook">Log In With Facebook</a>

      {errorMess && (
        <div>
          <h3>ERROR</h3>
          <p>{errorMess}</p>
        </div>
      )}
    </div>
  );
}

export default App;
