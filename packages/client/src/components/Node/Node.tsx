import { cx } from '@emotion/css';
import clsx from 'clsx';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import Draggable1, { DraggableProps } from 'react-draggable';
export const Draggable = Draggable1 as React.ComponentClass<Partial<DraggableProps>>;

import { INodeActionProps, INodePortsProps, INodeProps } from '~/components/Node/Node.types';
import { Port } from '~/components/Node/Port/Port';
import { CIRCUIT_SIZE, NODE_POSITION_OFFSET_X, NODE_WIDTH } from '~/constants/circuit';
import { useHover } from '~/hooks/useHover/useHover';
import { fromCartesianPoint } from '~/utils/coordinates/coordinates';



export const NODE_CONTENT_PADDING = 12;

export const Node = observer(
    // eslint-disable-next-line react/display-name
    React.forwardRef<HTMLDivElement, INodeProps>(
        ({ name, active, inputs, outputs, position, actions, onDrag, onClick, onFocus }, ref) => {
            const { onMouseEnter, onMouseLeave, isHovered } = useHover();

            const nodeWrapperClassNames = clsx(
                `absolute flex flex-col select-none rounded-xl transition-shadow bg-neutral-100 active:shadow-xl`,
                {
                    'z-10': active,
                    'z-20': !active,
                    'shadow-xl': active
                }
            );

            const nodeHeaderWrapperClassNames = clsx(
                'flex flex-row justify-between items-center py-2 px-4 text-xxs font-medium bg-neutral-100 uppercase tracking-wider rounded-t-xl border-b-2 border-b-neutral-400',
                {
                    'border-b-accent': active
                }
            );

            const nodeActionsClassNames = clsx('transition-opacity', {
                'opacity-0': !(isHovered || active),
                'opacity-100': isHovered || active
            });

            const nodeContentWrapperClassNames = clsx(
                `flex flex-row justify-between items-start rounded-b-xl border-b-neutral-400`
            );

            return (
                <Draggable
                    position={fromCartesianPoint(
                        CIRCUIT_SIZE,
                        CIRCUIT_SIZE,
                        position.x - NODE_POSITION_OFFSET_X,
                        position.y
                    )}
                    onDrag={onDrag}
                    handle=".handle"
                >
                    <div
                        ref={ref}
                        className={nodeWrapperClassNames}
                        style={{
                            width: NODE_WIDTH,
                            fontFeatureSettings: `"ss02" 1`
                        }}
                        onClick={onClick}
                        onFocus={onFocus}
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                        tabIndex={0}
                    >
                        <div className={cx(nodeHeaderWrapperClassNames, 'handle')}>
                            <span>{name}</span>
                            {!!actions?.length && (
                                <div className={nodeActionsClassNames}>
                                    {actions.map((action, index) => (
                                        <NodeAction key={`${index}-action`} {...action} />
                                    ))}
                                </div>
                            )}
                        </div>
                        <div
                            className={nodeContentWrapperClassNames}
                            style={{
                                padding: NODE_CONTENT_PADDING
                            }}
                        >
                            <NodePorts ports={Object.values(inputs)} />
                            <NodePorts ports={Object.values(outputs)} isOutputWrapper={true} />
                        </div>
                    </div>
                </Draggable>
            );
        }
    )
);

const NodeAction = ({ onClick }: INodeActionProps) => {
    return <div className="w-2 h-2 rounded bg-red-400 hover:opacity-50 transition-opacity" onClick={onClick} />;
};

const NodePorts = ({ ports, isOutputWrapper }: INodePortsProps) => {
    const portsWrapperClassNames = clsx('flex flex-col grow-1', {
        'items-end': isOutputWrapper,
        'items-start': isOutputWrapper
    });

    return (
        <div className={portsWrapperClassNames}>
            {ports.map(port => (
                <Port key={port.id} port={port} />
            ))}
        </div>
    );
};
