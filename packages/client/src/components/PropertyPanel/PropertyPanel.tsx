// import { AddOutlined, TextureOutlined } from '@mui/icons-material';
import { observer } from 'mobx-react-lite';
import { useRef, useMemo } from 'react';

import { useRenderer } from '../../hooks/useRenderer/useRenderer';
// import { IconButton } from '../IconButton/IconButton';
import { BooleanControl } from '../Control/BooleanControl/BooleanControl';
import { NumberControl } from '../Control/NumberControl/NumberControl';
import { TypeControl } from '../Control/TypeControl/TypeControl';
import { VectorControl } from '../Control/VectorControl/VectorControl';
import { LayerPanel } from '../LayerPanel/LayerPanel';

// import { UniformsPanel } from '../UniformsPanel/UniformsPanel';
import { useCircuit } from '~/hooks/useCircuit/useCircuit';
import { useProjectContext } from '~/providers/ProjectProvider/ProjectProvider';


const CircuitPorts = observer(() => {
    const circuit = useCircuit();

    if (!circuit.selectedNodes) {
        return null;
    }

    const [selectedCandidate] = circuit.selectedNodes;

    const inputs = selectedCandidate?.inputs;

    const inputControls = Object.values(inputs || [])
        .filter(input => !input.connected)
        .map(input => {
            switch (input.type) {
                case 'vec2':
                case 'vec3':
                case 'vec4':
                    return <VectorControl key={input.id} port={input} />;
                case 'float':
                    return <NumberControl key={input.id} port={input} />;
                case 'bool':
                    return <BooleanControl key={input.id} port={input} />;
            }
        })
        .filter(Boolean);

    return inputControls.length ? (
        <div className='p-6'>
            <h3 className="text-md font-medium mb-6">Inputs</h3>
            {selectedCandidate && (!!inputControls.length || selectedCandidate.data.type) && (
                <div>
                    {selectedCandidate.data.type && <TypeControl node={selectedCandidate} />}
                    {!!inputControls.length && inputControls}
                </div>
            )}
        </div>
    ) : null;
});

export const PropertyPanel = observer(() => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { project, activeLayer, handleCompilationError, handleCompilationSuccess } = useProjectContext();

    const layersToRender = useMemo(() => project ? [
        ...project.layers.slice(
            undefined, 
            project.layers.findIndex(layer => layer.id === activeLayer?.id) + 1
        )
    ] : [], [project, activeLayer]);

    useRenderer(
        canvasRef,
        layersToRender,
        false,
        handleCompilationError,
        handleCompilationSuccess
    );

    return (
        <aside className="flex flex-col w-96 h-full bg-neutral-100 z-10">
            <div className="relative flex flex-col p-6 pt-12">
                <canvas ref={canvasRef} className="rounded-2xl bg-neutral-300" width="285" height="180" />
            </div>
            <CircuitPorts />
            <div className="flex flex-col p-6 grow-1 h-full">
                <h3 className="text-md font-medium mb-6">Layers</h3>
                {project && <LayerPanel />}
            </div>
        </aside>
    );
});
