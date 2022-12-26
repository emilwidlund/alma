import { Prisma } from '@prisma/client';

import creation from './creation.json';
import gradient from './gradient.json';

export const projectSeed: Prisma.ProjectCreateInput[] = [
    {
        name: 'My Source Project',
        type: 'SHADER_SOURCE',
        owner: {
            connect: {
                email: 'inzanic@gmail.com'
            }
        }
    },
    {
        name: 'My Fourth Project',
        circuit: creation,
        type: 'SHADER_CIRCUIT',
        owner: {
            connect: {
                email: 'inzanic@gmail.com'
            }
        }
    },
    {
        name: 'My Third Project',
        circuit: gradient,
        type: 'SHADER_CIRCUIT',
        owner: {
            connect: {
                email: 'inzanic@gmail.com'
            }
        }
    },
    {
        name: 'My Second Project',
        circuit: creation,
        type: 'SHADER_CIRCUIT',
        owner: {
            connect: {
                email: 'ewidlund@alma.sh'
            }
        }
    },
    {
        name: 'My First Project',
        circuit: gradient,
        type: 'SHADER_CIRCUIT',
        owner: {
            connect: {
                email: 'ewidlund@alma.sh'
            }
        }
    }
];
