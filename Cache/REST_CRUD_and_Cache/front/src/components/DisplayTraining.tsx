import React from 'react'
import { Training } from '../types'
import DisplayExercise from './DisplayExercise'
import "./../styles/DisplayTraining.css"

type Props = {
    training: Training
}

export default function DisplayTraining({ training }: Props) {
    return (
        <div className="training-container">
            <p className="training-date">Done the {training.date.toLocaleDateString()}</p>
            {training.exercises.map((exercise, key) => {
                return <DisplayExercise exercise={exercise} key={key} />
            })}
        </div>
    )
}
