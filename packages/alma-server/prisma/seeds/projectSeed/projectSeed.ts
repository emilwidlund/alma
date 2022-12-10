import { Prisma } from '@prisma/client';

import circuit from './circuit.json';

export const projectSeed: Prisma.ProjectCreateInput[] = [
    {
        name: 'My First Project',
        mediaUrl: 'https://pbs.twimg.com/profile_images/1543286859828174849/2JmJgBEK_400x400.jpg',
        circuit,
        owner: {
            connect: {
                email: 'hello@emilwidlund.com'
            }
        }
    }
];
