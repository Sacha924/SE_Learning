export type Exercise = {
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