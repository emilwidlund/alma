import { Layer } from '@usealma/types';

export type ProjectCardProps = {
    name: string;
    projectId: string;
    author: {
        username: string;
        image: string;
    };
    layers: Layer[];
    preview: string;
};
