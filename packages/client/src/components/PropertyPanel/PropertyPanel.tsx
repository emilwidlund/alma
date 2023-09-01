// import { AddOutlined, TextureOutlined } from '@mui/icons-material';
import { LayerSchema } from '@/../types/build';
import { useQuery } from '@apollo/client';
import { WebGLNodeType } from '@usealma/webgl';
import { observer } from 'mobx-react-lite';
import { useRef, useMemo } from 'react';

import { useRenderer } from '../../hooks/useRenderer/useRenderer';
import { BooleanControl } from '../Control/BooleanControl/BooleanControl';
import { NumberControl } from '../Control/NumberControl/NumberControl';
import { TypeControl } from '../Control/TypeControl/TypeControl';
import { VectorControl } from '../Control/VectorControl/VectorControl';
import { LayerPanel } from '../LayerPanel/LayerPanel';
import { PROJECT_QUERY } from '~/apollo/queries';
import { useCircuit } from '~/hooks/useCircuit/useCircuit';
import { useProject } from '~/providers/ProjectProvider/ProjectProvider';
import { NODE_ICON_RESOLVER_MAP } from '~/utils/icons/iconResolver';

const NodeInfo = observer(() => {
    const circuit = useCircuit();

    if (!circuit.selectedNodes || circuit.selectedNodes.length !== 1) {
        return null;
    }

    const [selectedNode] = circuit.selectedNodes;

    const Icon = NODE_ICON_RESOLVER_MAP[selectedNode.type as WebGLNodeType];
    const description =
        'description' in selectedNode.constructor ? (selectedNode.constructor.description as string) : undefined;

    return (
        <div className="p-6">
            <div className="flex flex-row items-center mb-4">
                <Icon fontSize="small" />
                <h3 className="text-md font-medium ml-3 pt-0.5 text-slate-400">{selectedNode.name}</h3>
            </div>
            {description && <p className="text-sm leading-normal">{description}</p>}
        </div>
    );
});

const NodePorts = observer(() => {
    const circuit = useCircuit();

    if (!circuit.selectedNodes) {
        return null;
    }

    const [selectedNode] = circuit.selectedNodes;

    const inputControls = Object.values(selectedNode?.inputs || [])
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
                default:
                    return;
            }
        })
        .filter(Boolean);

    return inputControls.length ? (
        <div className="p-6 border-t border-neutral-500">
            <h3 className="text-md font-medium mb-6 text-slate-400">Inputs</h3>
            {selectedNode && (!!inputControls.length || selectedNode.data.type) && (
                <div>
                    {selectedNode.data.type && <TypeControl node={selectedNode} />}
                    {!!inputControls.length && inputControls}
                </div>
            )}
        </div>
    ) : null;
});

export const PropertyPanel = observer(() => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { projectId, activeLayerId, handleCompilationError, handleCompilationSuccess } = useProject();

    const { data: { project } = { project: undefined } } = useQuery(PROJECT_QUERY, { variables: { id: projectId } });

    const layers = useMemo(() => project?.layers.map(layer => LayerSchema.parse(layer)) || [], [project]);

    const layersToRender = useMemo(
        () =>
            project
                ? activeLayerId
                    ? [...layers.slice(undefined, layers.findIndex(layer => layer.id === activeLayerId) + 1)]
                    : layers
                : [],
        [project, layers, activeLayerId]
    );

    useRenderer(canvasRef, layersToRender, false, handleCompilationError, handleCompilationSuccess);

    return (
        <aside className="flex flex-col w-96 h-full bg-neutral-700 z-10 border-l border-neutral-600">
            <div className="relative flex flex-col p-6 pt-12">
                <canvas ref={canvasRef} className="rounded-2xl bg-black" width="285" height="180" />
            </div>
            <div className="border-b border-neutral-500">
                <NodeInfo />
                <NodePorts />
            </div>
            <div className="flex flex-col p-6 grow-1 h-full">
                <h3 className="text-md font-medium mb-6 text-slate-400">Layers</h3>
                {project && <LayerPanel layers={layers} />}
            </div>
        </aside>
    );
});
