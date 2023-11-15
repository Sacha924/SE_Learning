# What I learned during this project:

## Component vs Function call approach

Component Approach (<UserDisplay user={user} key={i}/>): This is the standard React way of using components. It benefits from React's optimizations like reconciling and state management. Components can have lifecycle methods, hooks, and can be easily integrated with the rest of the React ecosystem.

Function Call (UserDisplay(user)): This is just a function call that returns JSX. It does not get treated as a React component, meaning you lose out on component lifecycle methods, state handling, and other React features. It's less conventional in React applications and may lead to unexpected behaviors in more complex scenarios.

The component approach is more idiomatic in React and provides more flexibility and integration with React's features. The function call approach is simpler but less powerful and can potentially lead to issues in complex applications.


## Small script trick

instead of doing : `node src/index.ts`

in my package.json I can add the following : `"dev": "ts-node-dev src/index.ts"`
and then I can use the command `npm run dev`, it will be the same as `node src/index.ts`

## Railway

Railway is an infrastructure platform where you can provision infrastructure, develop with that infrastructure locally, and then deploy to the cloud.

After the creation of my PostgreSQL DB and migration `npx prisma migrate dev --name init`, i got :

<img src="1.JPG"/>

And after running `npx prisma db seed`:

<img src="2.JPG"/>
