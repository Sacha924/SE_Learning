import React from 'react';
import DisplayTraining from './components/DisplayTraining';
import { Exercise, Training } from './types';
import "./styles/App.css"

function App() {
  const benchP: Exercise = {
    name: "Bench Press",
    sets: 3,
    reps: 10,
    weight: 75,
  };

  const squats: Exercise = {
    name: "Squats",
    sets: 4,
    reps: 12,
    weight: 100,
  }

  const deadlifts: Exercise = {
    name: "Deadlift",
    sets: 3,
    reps: 8,
    weight: 120,
  }

  const training_sb: Training = {
    name:"sb",
    date: new Date('2023-11-18'),
    exercises: [
      benchP,
      squats,
    ]
  }

  const training_deadlift: Training = {
    name: "deadliftTraining",
    date: new Date('2023-11-18'),
    exercises: [
      deadlifts
    ]
  }

  const trainings: Training[] = [training_sb, training_deadlift]

  return (
    <div className="App">
      {trainings.map((training, key) => {
        return <DisplayTraining training={training} key={key}/>
      })}
    </div>
  );
}

export default App;
