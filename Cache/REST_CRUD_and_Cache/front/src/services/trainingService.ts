const BASE_URL = "http://localhost:4000/training";

export const getTrainings = async () => {
  const response = await fetch(BASE_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch trainings');
  }
  return response.json();
};

export const createTraining = async (trainingData: any) => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(trainingData)
  });
  if (!response.ok) {
    throw new Error('Failed to create training');
  }
  return response.json();
};