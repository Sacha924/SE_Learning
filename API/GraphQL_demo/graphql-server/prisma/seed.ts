// prisma/seed.ts

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {

    await prisma.user.upsert({
        where: {
            id: 1
        },
        update: {},
        create: {
            name: "Sacha",
            messages: {
                create: [
                    {
                        body: "A Note from Sachadito",
                    },
                    {
                        body: "salut",
                    },
                ],
            },
        },
    });

    await prisma.user.upsert({
        where: {
            id: 2
        },
        update: {},
        create: {
            name: "Thierry",
            messages: {
                create: [
                    {
                        body: "A Note from Thierry chad",
                    },
                    {
                        body: "babanax",
                    },
                ],
            },
        },
    });

    await prisma.user.upsert({
        where: {
            id: 3
        },
        update: {},
        create: {
            name: "Jules",
            messages: {
                create: [
                    {
                        body: "jjujujul",
                    },
                ],
            },
        },
    });
}

main().then(() => {
    console.log("Data seeded...");
});