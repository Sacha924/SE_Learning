import React, { useState } from 'react';
import { useMutation } from 'urql';
import { CreateTodoDocument } from '../graphql/generated';

export default function CreateTodo() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [, executeMutation] = useMutation(CreateTodoDocument);

    const submitForm = async (event: { preventDefault: () => void; }) => {
        event.preventDefault(); 
        executeMutation({ title, content });
    };

    return (
        <div>
            <p>Form to create todo:</p>
            <form onSubmit={submitForm}>
                <input 
                    type="text" 
                    name="title" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                />
                <input 
                    type="text" 
                    name="content" 
                    value={content} 
                    onChange={(e) => setContent(e.target.value)} 
                />
                <button type="submit">Create Todo</button>
            </form>
        </div>
    );
}
