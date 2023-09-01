import { ShapeLineOutlined, StreamOutlined, TuneOutlined } from '@mui/icons-material';
import { useRouter } from 'next/router';

import { FloatingTabBar } from '~/components/FloatingTabBar/FloatingTabBar';

export const ProjectTabsContainer = () => {
    const {
        query: { username, projectId }
    } = useRouter();

    return (
        <aside className="fixed flex flex-col h-full items-center justify-start pl-12 z-30">
            <div className="my-auto">
                <FloatingTabBar
                    items={[
                        {
                            name: 'Preview',
                            path: `/${username}/${projectId}`,
                            icon: <StreamOutlined fontSize="inherit" />
                        },
                        {
                            name: 'Edit',
                            path: `/${username}/${projectId}/edit`,
                            icon: <ShapeLineOutlined fontSize="inherit" />
                        },
                        {
                            name: 'Settings',
                            path: `/${username}/${projectId}/settings`,
                            icon: <TuneOutlined fontSize="inherit" />
                        }
                    ]}
                />
            </div>
        </aside>
    );
};
