import { builder } from "../builder";

// Because we are using Pothos's Prisma plugin, the builder instance now has a method named prismaObject 
// We will use to define our object types.
builder.prismaObject("User", {
    fields: t => ({
        id: t.exposeID("id"),
        name: t.exposeString("name"),
        messages: t.relation("messages")
    })
})