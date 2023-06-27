import { PrismaClient } from '@prisma/client';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const prismaClient = new PrismaClient();

export default NextAuth({
    secret: process.env.SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!,
            authorization: {
                params: {
                    prompt: 'consent',
                    access_type: 'offline',
                    response_type: 'code'
                }
            }
        })
        /* GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }) */
    ],
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        signIn: async ({ account, user }) => {
            if (account?.provider === 'google' && user.email) {
                //check if user is in your database
                const userExist = !!(await prismaClient.user.findUnique({ where: { email: user?.email } }));

                if (!userExist) {
                    const { email, name, image } = user;

                    if (email && name && image) {
                        await prismaClient.user.create({
                            data: {
                                email,
                                // Creates a temporary username
                                username: name
                                    ?.replaceAll(' ', '_')
                                    .toLocaleLowerCase()
                                    .concat((Math.random() + 1).toString(36).substring(7)),
                                mediaUrl: image
                            }
                        });
                    } else {
                        return false;
                    }
                }

                return true;
            }

            return false;
        }
    }
});
