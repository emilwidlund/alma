import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';

import { ProjectCardProps } from './ProjectCard.types';
import { BaseCard } from '../BaseCard/BaseCard';

import { useHover } from '~/hooks/useHover/useHover';
import { useRenderer } from '~/hooks/useRenderer/useRenderer';

const ProjectCardCanvas = ({ layers }: Pick<ProjectCardProps, 'layers'>) => {
    const ref = useRef<HTMLCanvasElement>(null);

    useRenderer(ref, layers);

    return (
        <motion.canvas
            ref={ref}
            className="absolute rounded-2xl w-full h-full bg-neutral-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        />
    );
};

export const ProjectCard = ({ name, projectId, author, layers, preview }: ProjectCardProps) => {
    const [ref, isHovered] = useHover<HTMLDivElement>();

    return (
        <Link className="flex flex-col items-center text-center" href={`/${author.username}/${projectId}`}>
            <BaseCard ref={ref} className="hover:shadow-lg transition-shadow">
                <div className="relative w-64 h-40">
                    <AnimatePresence>
                        {isHovered ? (
                            <ProjectCardCanvas key="canvas" layers={layers} />
                        ) : (
                            <motion.div
                                key="preview"
                                className="absolute bg-neutral-200 bg-center bg-cover w-full h-full rounded-2xl"
                                style={{ backgroundImage: `url('${preview}')` }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            />
                        )}
                    </AnimatePresence>
                </div>
            </BaseCard>
            <h3 className="mt-4 text-m font-medium">{name}</h3>
        </Link>
    );
};
