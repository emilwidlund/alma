import {
    AddOutlined,
    AspectRatioOutlined,
    CameraOutlined,
    MouseOutlined,
    TextureOutlined,
    TimerOutlined
} from '@mui/icons-material';
import { useRef } from 'react';

import { PropertyPanelProps } from './PropertyPanel.types';
import { useRenderer } from '../../hooks/useRenderer/useRenderer';
import { IconButton } from '../IconButton/IconButton';
import { LayerPanel } from '../LayerPanel/LayerPanel';
import { UniformsPanel } from '../UniformsPanel/UniformsPanel';
import { useProjectContext } from '~/providers/ProjectProvider/ProjectProvider';

export const PropertyPanel = ({ onFragmentCompilationError }: PropertyPanelProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { project, activeLayer } = useProjectContext();

    useRenderer(
        canvasRef,
        project
            ? [...project.layers.slice(undefined, project.layers.findIndex(layer => layer.id === activeLayer?.id) + 1)]
            : [],
        onFragmentCompilationError
    );

    return (
        <aside className="flex flex-col w-96 h-full bg-neutral-100">
            <div className="relative flex flex-col p-6 pt-12">
                <canvas ref={canvasRef} className="rounded-2xl bg-neutral-300" width="285" height="180" />
            </div>
            <div className="flex flex-col p-6">
                <div className="flex flex-row items-center justify-between mb-6">
                    <h3 className="text-md font-medium">Inputs</h3>
                    <IconButton icon={<AddOutlined />} />
                </div>
                <UniformsPanel
                    items={[
                        { name: 'Time', type: 'Float', icon: <TimerOutlined /> },
                        { name: 'Mouse', type: 'Vector 4', icon: <MouseOutlined /> },
                        { name: 'Resolution', type: 'Vector 2', icon: <AspectRatioOutlined /> },
                        { name: 'Webcam', type: 'Sampler 2D', icon: <CameraOutlined /> },
                        { name: 'Previous Layer', type: 'Sampler 2D', icon: <TextureOutlined /> }
                    ]}
                />
            </div>
            <div className="flex flex-col p-6 grow-1 h-full">
                <h3 className="text-md font-medium mb-6">Layers</h3>
                {project && <LayerPanel />}
            </div>
        </aside>
    );
};
