import React, { useState } from 'react'
import { createExercises } from "./../services/exerciseService"

export default function CreateExercise() {
    const [formData, setFormData] = useState({ name: '', sets: 0, reps: 0, weight: 0 });
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            createExercises(formData)
            // setFormData({ name: '', sets: 0, reps: 0, weight: 0 });

        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unexpected error occurred');
        }
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>Create Exercise</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Exercise Name:</label>
                    <input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Exercise Name"
                        type="text"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="sets">Sets:</label>
                    <input
                        id="sets"
                        name="sets"
                        value={formData.sets}
                        onChange={handleChange}
                        type="number"
                        min="0"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="reps">Reps:</label>
                    <input
                        id="reps"
                        name="reps"
                        value={formData.reps}
                        onChange={handleChange}
                        type="number"
                        min="0"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="weight">Weight:</label>
                    <input
                        id="weight"
                        name="weight"
                        value={formData.weight}
                        onChange={handleChange}
                        type="number"
                        min="0"
                        required
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
