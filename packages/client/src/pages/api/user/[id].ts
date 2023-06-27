import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { NextApiRequest, NextApiResponse } from 'next';

const prismaClient = new PrismaClient();

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    const user = await prismaClient.user.findUnique({
        where: { id: Array.isArray(id) ? id[0] : id ?? '' }
    });

    return NextResponse.json(user);
}
