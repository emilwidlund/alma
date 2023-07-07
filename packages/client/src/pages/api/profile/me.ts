import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';
import { ProfileSchema } from '@usealma/types';
import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '~/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const supabaseServerClient = createPagesServerClient({ req, res });
    const {
        data: { user }
    } = await supabaseServerClient.auth.getUser();

    if (!user) {
        res.status(401).send({});
        return;
    }

    const profile = await prisma.profile.findUnique({
        where: { userId: user.id }
    });

    if (!profile) {
        res.status(404).send({});
        return;
    }

    res.status(200).send(
        ProfileSchema.parse({
            id: profile.id,
            username: profile.username,
            image: profile.image,
            location: profile.location,
            bio: profile.bio,
            website: profile.website,
            createdAt: profile.createdAt.toJSON(),
            updatedAt: profile.updatedAt.toJSON()
        })
    );
}
