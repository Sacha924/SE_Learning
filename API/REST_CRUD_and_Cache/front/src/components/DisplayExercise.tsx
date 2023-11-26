import React from 'react'
import { Exercise } from '../types'
import "../styles/DisplayExercise.css"

type Props = {
    exercise: Exercise
}

export default function DisplayExercise({ exercise }: Props) {
    return (
        <div className="exercise-container">
            <p className="exercise-name">{exercise.name}</p>
            <p className="exercise-detail">Sets: {exercise.sets}</p>
            <p className="exercise-detail">Reps: {exercise.reps}</p>
            <p className="exercise-detail">Weight: {exercise.weight}</p>
        </div>
    )
}
