const { PrismaClient } = require('@prisma/client');

const projectSeed = require('./seeds/projectSeed/projectSeed');
const profileSeed = require('./seeds/profileSeed/profileSeed');

const prisma = new PrismaClient();

async function main() {
    console.log(`Seeding database...`);

    for (const data of profileSeed) {
        const profile = await prisma.profile.create({
            data
        });

        console.log(`Created profile with id: ${profile.id}`);
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
