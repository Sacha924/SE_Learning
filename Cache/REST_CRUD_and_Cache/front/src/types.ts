export type Exercise = {
    name: string,
    sets: number,
    reps: number,
    weight: number,
}

export type Training = {
    date: Date,
    exercises: Exercise[]
}