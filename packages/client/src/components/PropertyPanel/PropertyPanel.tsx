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

export const PropertyPanel = ({
    project,
    fragmentSource,
    activeLayerIndex,
    setActiveLayerIndex,
    onFragmentCompilationError
}: PropertyPanelProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useRenderer(
        canvasRef,
        [...project.layers.slice(undefined, activeLayerIndex), { ...project.layers[0], context: fragmentSource }],
        onFragmentCompilationError
    );

    return (
        <aside className="flex flex-col w-96 h-full bg-neutral-100">
            <div className="relative flex flex-col p-6 pt-12">
                <canvas ref={canvasRef} className="rounded-2xl bg-neutral-300" width="285" height="180" />
            </div>
            <div className="flex flex-col p-6">
                <div className="flex flex-row items-center justify-between mb-6">
                    <h3 className="text-md font-medium">Uniforms</h3>
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
            <div className="flex flex-col p-6 grow-1">
                <h3 className="text-md font-medium mb-6">Hierarchy</h3>
                <LayerPanel
                    activeLayerIndex={activeLayerIndex}
                    setActiveLayerIndex={setActiveLayerIndex}
                    items={project.layers.map(layer => ({
                        name: layer.name,
                        type: layer.type,
                        visible: layer.enabled
                    }))}
                />
            </div>
        </aside>
    );
};
