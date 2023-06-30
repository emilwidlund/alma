import { LayerSchema } from '@/../types/build';
import { NextApiRequest, NextApiResponse } from 'next';
import { OwnerSchema } from '~/models/Profile/Profile';
import { ProjectSchema } from '~/models/Project/Project';
import { prisma } from '~/db';
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const supabaseServerClient = createPagesServerClient({ req, res });
    const {
        data: { user }
    } = await supabaseServerClient.auth.getUser();

    if (!user) {
        res.status(401).send({});
        return;
    }

    const projects = await prisma.project.findMany({
        where: { owner: { userId: user.id } },
        include: { owner: true, layers: true }
    });

    if (!projects) {
        res.status(404).send({});
        return;
    }

    res.status(200).send(
        projects.map(project =>
            ProjectSchema.parse({
                id: project.id,
                private: project.private,
                name: project.name,
                image: project.image,
                owner: OwnerSchema.parse({
                    ...project.owner,
                    createdAt: project.owner.createdAt.toJSON(),
                    updatedAt: project.owner.updatedAt.toJSON()
                }),
                layers: project.layers.map(layer =>
                    LayerSchema.parse({
                        id: layer.id,
                        name: layer.name,
                        type: layer.type,
                        context: layer.type === 'CIRCUIT' ? JSON.stringify(layer.circuit) : layer.fragment,
                        enabled: layer.enabled,
                        blendingMode: layer.blendingMode
                    })
                ),
                createdAt: project.createdAt.toJSON(),
                updatedAt: project.updatedAt.toJSON()
            })
        )
    );
}
