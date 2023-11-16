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


## Prisma - Pothos - GraphQL

<img src="3.JPG"/>


Prisma Models: Prisma is used to define your data models, like User and Message. These models are typically mapped to your database tables.

Pothos and GraphQL Types: Pothos can automatically generate GraphQL types based on your Prisma models. So for models like User and Message, corresponding GraphQL types will be created.

Manual Specification for Queries: While Pothos auto-generates types, you need to manually define the GraphQL queries (and mutations). These are the operations that allow clients to fetch (Query) or modify (Mutation) data. For instance, you would define a query to retrieve users in the GraphQL schema.

In essence, Pothos leverages your Prisma models to simplify the creation of GraphQL types, but the logic for how data is queried or mutated (the resolvers for queries and mutations) needs to be defined by you.


The Prisma schema defines the shape of the data in the database, while the GraphQL schema defines the data available in the API.

quand on parle de schéma en graphql, on parle à la fois des types objets, des types query et des types mutations
le schéma c'est un peu tout ce qu'on peut requêter / faire avec l'api

<img src="4.JPG"/>



## Something I wasn't aware of

 In JavaScript and TypeScript, when a module (in this case, models/Message and models/User) is imported, the code within that module is executed. This behavior is particularly useful in scenarios like this, where the purpose of the import is to ensure that certain configurations or definitions (such as those within your model files) are executed and registered before further use - in this case, before generating the GraphQL schema with builder.toSchema({}).



 <img src="5.JPG"/>
