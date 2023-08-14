import { AddOutlined, TextureOutlined } from '@mui/icons-material';
import { useRef } from 'react';

import { useRenderer } from '../../hooks/useRenderer/useRenderer';
import { IconButton } from '../IconButton/IconButton';
import { LayerPanel } from '../LayerPanel/LayerPanel';
import { UniformsPanel } from '../UniformsPanel/UniformsPanel';
import { useProjectContext } from '~/providers/ProjectProvider/ProjectProvider';

export const PropertyPanel = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { project, activeLayer, handleCompilationError, handleCompilationSuccess } = useProjectContext();

    useRenderer(
        canvasRef,
        project
            ? [...project.layers.slice(undefined, project.layers.findIndex(layer => layer.id === activeLayer?.id) + 1)]
            : [],
        handleCompilationError,
        handleCompilationSuccess
    );

    return (
        <aside className="flex flex-col w-96 h-full bg-neutral-100 z-10">
            <div className="relative flex flex-col p-6 pt-12">
                <canvas ref={canvasRef} className="rounded-2xl bg-neutral-300" width="285" height="180" />
            </div>
            <div className="flex flex-col p-6">
                <div className="flex flex-row items-center justify-between mb-6">
                    <h3 className="text-md font-medium">Inputs</h3>
                    <IconButton icon={<AddOutlined />} />
                </div>
                <UniformsPanel
                    items={
                        project?.uniforms.map(uniform => ({
                            name: uniform.name,
                            type: uniform.type,
                            icon: <TextureOutlined />
                        })) || []
                    }
                />
            </div>
            <div className="flex flex-col p-6 grow-1 h-full">
                <h3 className="text-md font-medium mb-6">Layers</h3>
                {project && <LayerPanel />}
            </div>
        </aside>
    );
};
