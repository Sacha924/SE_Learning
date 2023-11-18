var express = require("express")
var { graphqlHTTP } = require("express-graphql")
var { buildSchema } = require("graphql")
var { PrismaClient } = require('@prisma/client');

// Instantiate Prisma Client
const prisma = new PrismaClient();


// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Todo {
    id: ID!
    title: String!
    content: String!
    done: Boolean
  }
  type Query {
    todos: [Todo]
    todo(id: ID!): Todo
  }
`)


// The root provides a resolver function for each API endpoint
var root = {
  todos: async () => {
    // Fetch todos from the database using Prisma Client
    try {
      const todos = await prisma.todo.findMany();
      return todos;
    } catch (error) {
      console.error(error);
      throw new Error('Error fetching todos');
    }
  },
};

var app = express()
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
)
app.listen(4000)
console.log("Running a GraphQL API server at http://localhost:4000/graphql")