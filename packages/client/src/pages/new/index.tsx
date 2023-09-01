import { PrismaClient } from '@prisma/client';
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';
import { GetServerSidePropsContext } from 'next';

import { DEFAULT_FRAGMENT_LAYER_CONTEXT } from '~/templates/layer';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    // Create authenticated Supabase Client
    const supabase = createPagesServerClient(ctx);
    // Check if we have a session
    const {
        data: { session }
    } = await supabase.auth.getSession();

    const prisma = new PrismaClient();

    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        };
    }

    const profile = await prisma.profile.findUnique({ where: { userId: session?.user.id } });

    if (!profile) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        };
    }

    const project = await prisma.project.create({
        data: {
            name: 'Untitled',
            ownerId: profile.id,
            layers: {
                create: [
                    {
                        name: 'Untitled',
                        type: 'FRAGMENT',
                        fragment: DEFAULT_FRAGMENT_LAYER_CONTEXT,
                        index: 0
                    }
                ]
            }
        }
    });

    return {
        redirect: {
            destination: project ? `/${profile.username}/${project.id}` : '/',
            permanent: false
        }
    };
};

export default function New() {
    return <></>;
}
