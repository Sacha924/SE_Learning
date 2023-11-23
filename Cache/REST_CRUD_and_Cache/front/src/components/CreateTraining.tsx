import React, { useEffect, useState } from 'react'
import { Exercise } from '../types';
import { createTraining } from "./../services/trainingService"
import { getExercises } from "./../services/exerciseService"

export default function CreateTraining() {
    const [formData, setFormData] = useState<{
        name: string,
        date: string,
        exercises: string[]
    }>({
        name: '',
        date: '',
        exercises: []
    });
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchExercises = async () => {
            const fetchedExercises = await getExercises()
            setExercises(fetchedExercises);
        };
        fetchExercises();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (e.target.name === "exercises") {
            const options = (e.target as HTMLSelectElement).options;
            let value: string[] = [];
            for (let i = 0; i < options.length; i++) {
                if (options[i].selected) {
                    value.push(options[i].value);
                }
            }
            setFormData({ ...formData, exercises: value });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            console.log(formData)
            await createTraining(formData);
            // Reset form or navigate to another page
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unexpected error occurred');
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>Create Training</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Training Name:</label>
                    <input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        type="text"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="date">Date:</label>
                    <input
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        type="date"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="exercises">Exercises:</label>
                    <select
                        multiple
                        id="exercises"
                        name="exercises"
                        value={formData.exercises}
                        onChange={handleChange}
                        required
                    >
                        {exercises.map((exercise) => (
                            <option key={exercise._id} value={exercise.name || ''}>
                                {exercise.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}