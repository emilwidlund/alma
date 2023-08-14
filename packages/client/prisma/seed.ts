const PrismaClient = require('@prisma/client').PrismaClient;

const profileSeed = require('./seeds/profileSeed/profileSeed');
const projectSeed = require('./seeds/projectSeed/projectSeed');

const prismaClient = new PrismaClient();

async function main() {
    console.log(`Seeding database...`);

    for (const data of profileSeed) {
        const profile = await prismaClient.profile.create({
            data
        });

        console.log(`Created profile with id: ${profile.id}`);
    }

    for (const data of projectSeed) {
        const project = await prismaClient.project.create({
            data
        });

        console.log(`Created project with id: ${project.id}`);
    }

    console.log(`Database seeding finished.`);
}

main()
    .then(async () => {
        await prismaClient.$disconnect();
    })
    .catch(async e => {
        console.error(e);
        await prismaClient.$disconnect();
        process.exit(1);
    });
