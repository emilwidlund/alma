import { Prisma } from '@prisma/client';

import creation from './creation.json';
import gradient from './gradient.json';

export const projectSeed: Prisma.ProjectCreateInput[] = [
    {
        name: 'My Second Project',
        mediaUrl: 'https://pbs.twimg.com/profile_images/1543286859828174849/2JmJgBEK_400x400.jpg',
        circuit: creation,
        owner: {
            connect: {
                email: 'hello@emilwidlund.com'
            }
        }
    },
    {
        name: 'My First Project',
        mediaUrl: 'https://pbs.twimg.com/profile_images/1543286859828174849/2JmJgBEK_400x400.jpg',
        circuit: gradient,
        owner: {
            connect: {
                email: 'hello@emilwidlund.com'
            }
        }
    }
];
