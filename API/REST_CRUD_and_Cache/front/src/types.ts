import { Key } from "react"

export type Exercise = {
    _id: Key | null | undefined
    name: string,
    sets: number,
    reps: number,
    weight: number,
}

export type Training = {
    name: string
    date: Date,
    exercises: Exercise[]
}