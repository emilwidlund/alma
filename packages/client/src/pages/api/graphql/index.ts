import 'reflect-metadata';
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { PrismaClient } from '@prisma/client';
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';
import { NextApiRequest } from 'next';

import { resolvers } from '~/graphql/resolvers';
import { Context } from '~/graphql/schema';
import { typeDefs } from '~/graphql/typeDefs';

const prisma = new PrismaClient();

const apolloServer = new ApolloServer<Context>({
    typeDefs,
    resolvers
});

export default startServerAndCreateNextHandler<NextApiRequest, Context>(apolloServer, {
    context: async (req, res) => {
        const supabaseServerClient = createPagesServerClient({ req, res });
        const {
            data: { user }
        } = await supabaseServerClient.auth.getUser();

        return {
            req,
            res,
            db: prisma,
            profile: await prisma.profile.findFirst({
                where: { userId: user?.id }
            })
        };
    }
});

// const supabase = createPagesServerClient({ req, res });
// const user = await supabase.auth.getUser();
