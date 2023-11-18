import React from 'react'
import { Todo } from '../types'
import "./../styles/DisplayTodo.css"

type Props = {
    todo: Todo,
}

export default function DisplayTodo({ todo }: Props) {
    return (
        <div className={`single-todo ${todo.done ? "done" : ""}`}>
            <h2> {todo.title}</h2>
            <p>{todo.content} </p>
        </div>
    )
}
