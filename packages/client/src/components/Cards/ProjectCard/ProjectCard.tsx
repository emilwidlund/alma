import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';

import { ProjectCardProps } from './ProjectCard.types';
import { BaseCard } from '../BaseCard/BaseCard';

import { useHover } from '~/hooks/useHover/useHover';
import { useRenderer } from '~/hooks/useRenderer/useRenderer';

const ProjectCardCanvas = ({ layers }: Pick<ProjectCardProps, 'layers'>) => {
    const ref = useRef<HTMLCanvasElement>(null);
    const { isHovered, onMouseEnter, onMouseLeave } = useHover();

    useRenderer(ref, layers, !isHovered);

    return (
        <motion.canvas
            ref={ref}
            className="absolute rounded-2xl w-full h-full bg-neutral-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        />
    );
};

export const ProjectCard = ({ name, projectId, author, layers }: ProjectCardProps) => {
    return (
        <Link className="flex flex-col items-center text-center" href={`/${author.username}/${projectId}`}>
            <BaseCard
                className="hover:shadow-xl transition-shadow"
            >
                <div className="relative w-64 h-40">
                    <AnimatePresence>
                        <ProjectCardCanvas key="canvas" layers={layers} />
                    </AnimatePresence>
                </div>
            </BaseCard>
            <h3 className="mt-4 text-sm font-medium">{name}</h3>
        </Link>
    );
};
