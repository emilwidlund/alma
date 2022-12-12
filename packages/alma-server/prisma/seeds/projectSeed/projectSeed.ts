import { Prisma } from '@prisma/client';

import creation from './creation.json';
import gradient from './gradient.json';

export const projectSeed: Prisma.ProjectCreateInput[] = [
    {
        name: 'My Fourth Project',
        circuit: creation,
        owner: {
            connect: {
                email: 'hello@emilwidlund.com'
            }
        }
    },
    {
        name: 'My Third Project',
        circuit: gradient,
        owner: {
            connect: {
                email: 'hello@emilwidlund.com'
            }
        }
    },
    {
        name: 'My Second Project',
        circuit: creation,
        owner: {
            connect: {
                email: 'hello@emilwidlund.com'
            }
        }
    },
    {
        name: 'My First Project',
        circuit: gradient,
        owner: {
            connect: {
                email: 'hello@emilwidlund.com'
            }
        }
    }
];
