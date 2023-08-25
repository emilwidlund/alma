import 'reflect-metadata';
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { PrismaClient } from '@prisma/client';
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';
import { NextApiRequest, NextApiResponse } from 'next';

import { resolvers } from '~/graphql/resolvers';
import { Context } from '~/graphql/schema';
import { typeDefs } from '~/graphql/typeDefs';

const prisma = new PrismaClient();

const apolloServer = new ApolloServer<Context>({
    typeDefs,
    resolvers
});

export default startServerAndCreateNextHandler(apolloServer, {
    context: async (req: NextApiRequest, res: NextApiResponse) => ({
        req,
        res,
        db: prisma,
        user: await createPagesServerClient({ req, res }).auth.getUser()
    })
});

// const supabase = createPagesServerClient({ req, res });
// const user = await supabase.auth.getUser();
