const BASE_URL = "http://localhost:4000/exercise";

export const getExercises = async () => {
  const response = await fetch(BASE_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch trainings');
  }
  return response.json();
};

export const createExercises = async (exerciseData: any) => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(exerciseData)
  });
  if (!response.ok) {
    throw new Error('Failed to create training');
  }
  return response.json();
};