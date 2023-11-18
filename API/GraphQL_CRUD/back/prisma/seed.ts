// prisma/seed.ts

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {

    await prisma.todo.upsert({
        where: {
            id: 1
        },
        update: {},
        create: {
            title: "BackEnd dev",
            content: "become a backend dev learning graphql"
        },
    })

    await prisma.todo.upsert({
        where: {
            id: 2
        },
        update: {},
        create: {
            title: "frontEnd dev",
            content: "become a frontend dev learning react"
        },
    })

    await prisma.todo.upsert({
        where: {
            id: 3
        },
        update: {},
        create: {
            title: "GOAT",
            content: "become the boss",
            done: true
        },
    })
}

main().then(() => {
    console.log("Data seeded...");
});