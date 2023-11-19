import type { GetTodosQuery } from "./graphql/generated";

export type Todo = NonNullable<GetTodosQuery["todos"]>[number];