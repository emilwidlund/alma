import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';
import { LayerSchema, OwnerSchema, ProjectSchema, UniformSchema } from '@usealma/types';
import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '~/db';

const GET = async (req: NextApiRequest, res: NextApiResponse) => {
    const supabaseServerClient = createPagesServerClient({ req, res });
    const {
        data: { user }
    } = await supabaseServerClient.auth.getUser();
    const { projectId } = req.query;

    if (typeof projectId !== 'string') {
        res.status(400).send({});
        return;
    }

    const project = await prisma.project.findUnique({
        where: { id: projectId },
        include: { owner: true, layers: true, uniforms: true }
    });

    if (!project) {
        res.status(404).send({});
        return;
    }

    if (project.owner.userId !== user?.id && project.private) {
        res.status(404).send({});
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
    );
};

const PUT = async (req: NextApiRequest, res: NextApiResponse) => {
    const supabaseServerClient = createPagesServerClient({ req, res });
    const {
        data: { user }
    } = await supabaseServerClient.auth.getUser();
    const { projectId } = req.query;

    if (typeof projectId !== 'string') {
        res.status(400).send({});
        return;
    }

    if (!user?.id) {
        res.status(401).send({});
        return;
    }

    const project = await prisma.project.findFirst({
        where: { id: projectId, owner: { userId: user.id } }
    });

    if (!project) {
        res.status(401).send({});
        return;
    }

    const projectData = ProjectSchema.deepPartial().parse(req.body);

    await prisma.project.update({
        where: { id: projectId },
        data: {
            name: projectData.name,
            image: projectData.image
            // layers: projectData.layers
        }
    });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            return GET(req, res);
        case 'PUT':
            return PUT(req, res);
    }
}
