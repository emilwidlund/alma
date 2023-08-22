import { Layer, Owner } from '@usealma/types';

export type ProjectCardProps = {
    name: string;
    projectId: string;
    author: Owner;
    layers: Layer[];
    image: string;
};
