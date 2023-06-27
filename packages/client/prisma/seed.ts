const { PrismaClient } = require('@prisma/client');

const projectSeed = require('./seeds/projectSeed/projectSeed');
const userSeed = require('./seeds/userSeed/userSeed');

const prisma = new PrismaClient();

async function main() {
    console.log(`Seeding database...`);

    for (const data of userSeed) {
        const user = await prisma.user.create({
            data
        });

        console.log(`Created user with id: ${user.id}`);
    }

    for (const data of projectSeed) {
        const project = await prisma.project.create({
            data
        });

        console.log(`Created project with id: ${project.id}`);
    }

    console.log(`Database seeding finished.`);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async e => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
