import { cx } from '@emotion/css';
import { Input, Output } from 'alma-graph';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import Draggable from 'react-draggable';

import { useHover } from '../../hooks/useHover/useHover';
import { Icon } from '../Icon/Icon';
import {
    nodeHeaderWrapperStyles,
    nodeContentWrapperStyles,
    nodeWrapperStyles,
    nodePortsWrapperStyles,
    nodeHeaderActionsStyles,
    nodeActionStyles
} from './Node.styles';
import { INodeActionProps, INodePortsProps, INodeProps } from './Node.types';
import { Port } from './Port/Port';

export const Node = observer(
    React.forwardRef<HTMLDivElement, INodeProps>(
        ({ name, active, inputs, outputs, position, actions, onDrag, onClick, onFocus }, ref) => {
            const [isCollapsed, setCollapsed] = React.useState(false);
            const { onMouseEnter, onMouseLeave, isHovered } = useHover();

            const onKeyPress = React.useCallback(
                (e: React.KeyboardEvent<HTMLDivElement>) => {
                    if (e.key === ' ') {
                        e.preventDefault();
                        e.stopPropagation();

                        setCollapsed(!isCollapsed);
                    }
                },
                [setCollapsed, isCollapsed]
            );

            const portPredicate = React.useCallback(
                (port: Input<any> | Output<any>) => (isCollapsed ? port.connected : true),
                [isCollapsed]
            );

            return (
                <Draggable position={position} onDrag={onDrag} handle=".handle">
                    <div
                        ref={ref}
                        className={nodeWrapperStyles(active)}
                        onClick={onClick}
                        onFocus={onFocus}
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                        onKeyPress={onKeyPress}
                        tabIndex={0}
                    >
                        <div className={cx(nodeHeaderWrapperStyles(active), 'handle')}>
                            <span>{name}</span>
                            {!!actions?.length && (
                                <div className={nodeHeaderActionsStyles(isHovered || active)}>
                                    {actions.map((action, index) => (
                                        <NodeAction key={`${index}-action`} {...action} />
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className={nodeContentWrapperStyles}>
                            <NodePorts ports={Object.values(inputs).filter(portPredicate)} />
                            <NodePorts ports={Object.values(outputs).filter(portPredicate)} isOutputWrapper={true} />
                        </div>
                    </div>
                </Draggable>
            );
        }
    )
);

const NodeAction = ({ onClick, color }: INodeActionProps) => {
    return <Icon className={nodeActionStyles} name="circle" size={12} color={color} onClick={onClick} />;
};

const NodePorts = ({ ports, isOutputWrapper }: INodePortsProps) => {
    return (
        <div className={nodePortsWrapperStyles(isOutputWrapper)}>
            {ports.map(port => (
                <Port key={port.id} port={port} />
            ))}
        </div>
    );
};
