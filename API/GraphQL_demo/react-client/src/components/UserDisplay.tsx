import React from 'react'
import { User } from '../types'


export default function UserDisplay(user: User) {
    return (
        <div className="text-white-600 flex-col  flex items-center justify-center p-4 gap-y-12 border border-sky-500">

            <p>{user.name}</p>
            {user.messages.map((message) => {
                return (
                    <div>{message.body}</div>
                )
            })}
        </div>
    )
}
