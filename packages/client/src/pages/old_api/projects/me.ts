import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';
import { LayerSchema, ProjectSchema, OwnerSchema, UniformSchema } from '@usealma/types';
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

    const projects = await prisma.project.findMany({
        where: { owner: { userId: user.id } },
        include: { owner: true, layers: true, uniforms: true }
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
                uniforms: project.uniforms.map(uniform =>
                    UniformSchema.parse({
                        id: uniform.id,
                        name: uniform.name,
                        type: uniform.type,
                        value: uniform.value
                    })
                ),
                createdAt: project.createdAt.toJSON(),
                updatedAt: project.updatedAt.toJSON()
            })
        )
    );
}
