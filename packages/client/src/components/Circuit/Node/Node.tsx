import clsx from 'clsx';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import Draggable1, { DraggableProps } from 'react-draggable';
export const Draggable = Draggable1 as React.ComponentClass<Partial<DraggableProps>>;
import { motion } from 'framer-motion';

import { NodeActionProps, NodePortsProps, NodeProps } from '~/components/Circuit/Node/Node.types';
import { Port } from '~/components/Circuit/Node/Port/Port';
import { CIRCUIT_SIZE, NODE_POSITION_OFFSET_X, NODE_WIDTH } from '~/constants/circuit';
import { useHover } from '~/hooks/useHover/useHover';
import { fromCartesianPoint } from '~/utils/coordinates/coordinates';

export const NODE_CONTENT_PADDING = 12;

export const Node = observer(
    // eslint-disable-next-line react/display-name
    React.forwardRef<HTMLDivElement, NodeProps>(
        ({ name, active, icon: Icon, inputs, outputs, position, actions, onDrag, onClick, onFocus }, ref) => {
            const { onMouseEnter, onMouseLeave, isHovered } = useHover();

            const nodeWrapperClassNames = clsx(
                `absolute flex flex-col select-none rounded-2xl transition-shadow bg-neutral-700 active:shadow-2xl border border-neutral-600 focus:outline-none`,
                {
                    'z-10': !active,
                    'z-20': active,
                    'shadow-xl': active
                }
            );

            const nodeHeaderWrapperClassNames = clsx(
                'flex flex-row justify-between items-center py-2 pl-3 pr-4 text-xxs font-medium uppercase tracking-wider rounded-t-xl border-b-2',
                {
                    'border-b-neutral-400': !active,
                    'border-b-accent': active,
                    'text-slate-300': active
                }
            );

            const nodeActionsClassNames = clsx('transition-opacity', {
                'opacity-0': !(isHovered || active),
                'opacity-100': isHovered || active
            });

            const nodeContentWrapperClassNames = clsx(
                `flex flex-row justify-between items-start rounded-b-xl border-b-neutral-700`
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
                    <motion.div
                        ref={ref}
                        variants={{
                            hidden: {
                                opacity: 0,
                                transition: {
                                    duration: 0.15
                                }
                            },
                            show: {
                                opacity: 1,
                                transition: {
                                    duration: 0.15
                                }
                            }
                        }}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className={nodeWrapperClassNames}
                        style={{
                            width: NODE_WIDTH,
                            fontFeatureSettings: `"ss02" on`
                        }}
                        onClick={onClick}
                        onFocus={onFocus}
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                        tabIndex={0}
                    >
                        <div className={clsx(nodeHeaderWrapperClassNames, 'handle')}>
                            <span className="flex flex-row items-baseline">
                                <span className="text-base">
                                    <Icon fontSize="inherit" />
                                </span>
                                <span className="ml-2">{name}</span>
                            </span>
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
                    </motion.div>
                </Draggable>
            );
        }
    )
);

// eslint-disable-next-line react/display-name
const NodeAction = React.memo(({ onClick }: NodeActionProps) => {
    return <div className="w-2 h-2 rounded bg-red-500 hover:opacity-50 transition-opacity" onClick={onClick} />;
});

// eslint-disable-next-line react/display-name
const NodePorts = React.memo(({ ports, isOutputWrapper }: NodePortsProps) => {
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
});
