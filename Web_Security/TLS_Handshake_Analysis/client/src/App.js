import logo from './logo.svg';
import './App.css';

function App() {

  const fetchData = async () => {
    let res = await fetch("https://localhost:4000")
    console.log(res)
  }

  return (
    <div className="App">
      hello
      <button onClick={fetchData}>click me</button>
    </div>
  );
}

export default App;
