import { LayerSchema } from '@/../types/build';
import { NextApiRequest, NextApiResponse } from 'next';
import { OwnerSchema } from '~/models/Profile/Profile';
import { ProjectSchema } from '~/models/Project/Project';
import { PrismaClient } from '@prisma/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient();
    const { projectId } = req.query;

    if (typeof projectId !== 'string') {
        return;
    }

    const project = await prisma.project.findUnique({
        where: { id: projectId },
        include: { owner: true, layers: true }
    });

    if (!project) {
        return;
    }

    res.status(200).send(
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
    );
}
