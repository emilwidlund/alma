import { Prisma } from '@prisma/client';

export const userSeed: Prisma.UserCreateInput[] = [
    {
        name: 'Emil Widlund',
        email: 'inzanic@gmail.com',
        username: 'emilwidlund',
        mediaUrl: 'https://pbs.twimg.com/profile_images/1543286859828174849/2JmJgBEK_400x400.jpg'
    },
    {
        name: 'Alma Widlund',
        email: 'ewidlund@alma.sh',
        username: 'almawidlund'
    }
];
