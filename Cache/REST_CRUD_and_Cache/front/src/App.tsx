import React, { useState, useEffect } from 'react';
import DisplayTraining from './components/DisplayTraining';
import { Exercise, Training } from './types';
import "./styles/App.css"

function App() {
  const [trainings, setTrainings] = useState<Training[]>()

  useEffect(() => {
    const getData = async()=>{
      const res = await fetch("http://localhost:4000/training").then(async (data) => await data.json())
      setTrainings(res)
    }
    getData()
  }, [])

  console.log(trainings)
  return (
    <div className="App">
      {trainings?.map((training, key) => {
        return <DisplayTraining training={training} key={key} />
      })}
    </div>
  );
}

export default App;
