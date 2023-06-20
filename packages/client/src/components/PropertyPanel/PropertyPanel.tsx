import { AspectRatioOutlined, MouseOutlined, TextureOutlined } from '@mui/icons-material';
import { useRef } from 'react';

import { PropertyPanelProps } from './PropertyPanel.types';
import { useRenderer } from '../../hooks/useRenderer/useRenderer';
import { LayerPanel } from '../LayerPanel/LayerPanel';
import { UniformsPanel } from '../UniformsPanel/UniformsPanel';

export const PropertyPanel = ({ fragmentSource, onFragmentCompilationError }: PropertyPanelProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useRenderer(
        canvasRef,
        [
            {
                id: '123',
                name: 'Test',
                context: fragmentSource,
                enabled: true,
                blendingMode: 'NORMAL'
            }
        ],
        onFragmentCompilationError
    );

    return (
        <aside className="flex flex-col w-112 h-full bg-neutral-100">
            <div className="relative flex flex-col p-6">
                <h3 className="text-md font-medium opacity-50">GLSL Layer</h3>
                <h2 className="text-xl font-medium my-4">Noise</h2>
                <canvas ref={canvasRef} className="rounded-2xl bg-neutral-300" width="285" height="180" />
            </div>
            <div className="flex flex-col p-6">
                <h3 className="text-md font-medium mb-6">Uniforms</h3>
                <UniformsPanel
                    items={[
                        { name: 'Mouse', type: 'Vector 4', icon: <MouseOutlined /> },
                        { name: 'Resolution', type: 'Vector 2', icon: <AspectRatioOutlined /> },
                        { name: 'Webcam', type: 'Texture', icon: <TextureOutlined /> }
                    ]}
                />
            </div>
            <div className="flex flex-col p-6">
                <h3 className="text-md font-medium mb-6">Hierarchy</h3>
                <LayerPanel
                    items={[
                        { name: 'Noise', type: 'GLSL', visible: true, icon: 'grain' },
                        { name: 'UV Transform', type: 'Visual', visible: true, icon: 'grain' },
                        { name: 'Vertex', type: 'GLSL', visible: false, icon: 'grain' }
                    ]}
                />
            </div>
        </aside>
    );
};
