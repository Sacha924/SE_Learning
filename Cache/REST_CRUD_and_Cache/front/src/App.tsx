import React, { useState, useEffect } from 'react';
import DisplayTraining from './components/DisplayTraining';
import { Exercise, Training } from './types';
import "./styles/App.css"
import { getTrainings } from './services/trainingService';
import CreateExercise from './components/CreateExercise';

function App() {
  const [trainings, setTrainings] = useState<Training[]>()
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getTrainings();
        setTrainings(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      } finally {
        setIsLoading(false);
      }
    }

    getData()
  }, [])

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      {trainings?.map((training, key) => {
        return <DisplayTraining training={training} key={key} />
      })}

      <CreateExercise/>
    </div>
  );
}

export default App;
