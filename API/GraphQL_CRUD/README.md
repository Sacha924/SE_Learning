# GraphQL CRUD App

Goal : improve my knowledge of graphQL by creating a CRUD app for to-do tasks.
Then learn how to use WebVitals and measure performance of the app.
Then set up a caching system and analyze its efficiency.

Gestion du cache : En REST, le cache fait partie de la spécification HTTP. Il est intégré nativement et trivial à implémenter. Contrairement à GraphQL, c’est une des conséquences de n’avoir qu’un point d’entrée. Cependant il existe des librairies pour l’implémenter, telles que FlacheQL ou encore Relay.
https://blog.dcube.fr/index.php/2023/03/28/decouverte-de-graphql/

## Passing props

here is 2 ways tions to pass props:
OPTION 1 :
```ts
return(<DisplayTodo {...todo} />)

// with DisplayTodo.tsx :
import React from 'react'
import { Todo } from '../types'

export default function DisplayTodo(props: Todo) {
    return (
        <div className={`single-todo ${props.done ? "done" : ""}`}>
            <h2> {props.title}</h2>
            <p>{props.content} </p>
        </div>
    )
}
```

OPTION 2 :
```ts
return(<DisplayTodo todo={todo} />)

//with DisplayTodo.tsx :
import React from 'react'
import { Todo } from '../types'

type Props = {
    todo: Todo,
}

export default function DisplayTodo({todo}: Props) {
    return (
        <div className={`single-todo ${todo.done ? "done" : ""}`}>
            <h2> {todo.title}</h2>
            <p>{todo.content} </p>
        </div>
    )
}
```

Both methods of passing props in React are valid and commonly used, but they have different use cases and implications:

**Option 1: Spread Attributes ({...todo})**

This approach is useful when:

You want to pass down all the properties of an object as separate props.
The component you're passing props to has a props interface/type that matches the structure of your object.
You want to keep the code concise, especially when the object properties align perfectly with the component's props.
However, this method can lead to unintended props being passed down if the object has more properties than the component expects. This can make the component's interface less explicit and potentially more difficult to understand or debug.

__Option 2: Named Prop (todo={todo})__

This approach is useful when:

You want to be explicit about what you're passing down to the component.
The component might receive multiple objects as props, and you need to differentiate them.
You want to maintain the structure of the prop for clarity, indicating that it's a single cohesive object.
This method provides more clarity and is generally easier to read and maintain, especially in larger components or applications. It makes the data flow and component API more explicit, which can be helpful in collaborative environments or for future code maintenance.

Best Practice:

Use Option 1 (spread attributes) when your component's props perfectly align with an object's properties, and you're confident that the object won't have additional unintended properties.
Use Option 2 (named prop) when you need clarity and explicitness in what you're passing as props, or when the component expects to receive multiple objects as props.


## Others

In JSX, when you directly include JavaScript expressions like booleans or null/undefined values, they do not render anything in the DOM. This is by design in React. use .toString()

### Installation command

Even if you just need to clone the project and do npm install, I track the various commands that I used here.
```
npx create-react-app . --template typescript
// BACK
npm install express express-graphql graphql --save
npm i -D ts-node-dev typescript @types/node
npx tsc --init
npm i -D prisma
npx prisma init
npx prisma migrate dev --name init
npx prisma db seed

// FRONT
npm i graphql
npm i -D @graphql-codegen/cli @graphql-codegen/typed-document-node @graphql-codegen/typescript @graphql-codegen/typescript-operations
npm run codegen
```

 <img src="6.JPG"/>
