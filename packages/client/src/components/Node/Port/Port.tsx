/** eslint-disable @typescript-eslint/no-explicit-any */

import { Input, Output } from '@usealma/graph';
import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { portTypeStyles, portWrapperStyles } from './Port.styles';
import { IPortProps } from './Port.types';
import { useCircuit } from '../../../hooks/useCircuit/useCircuit';
import { useHover } from '../../../hooks/useHover/useHover';
import { Icon } from '../../Icon/Icon';
import { Tooltip } from '../../Tooltip/Tooltip';
import { TooltipPosition } from '../../Tooltip/Tooltip.types';

export const Port = observer(({ port }: IPortProps) => {
    const ref = React.useRef<HTMLDivElement>(null);
    const circuit = useCircuit();
    const { onMouseEnter, onMouseLeave, isHovered } = useHover();
    const { onMouseEnter: onPortTypeEnter, onMouseLeave: onPortTypeLeave, isHovered: isPortTypeHovered } = useHover();

    const isOutput = React.useMemo(() => port instanceof Output, [port]);
    const tooltipPosition = React.useMemo(() => (isOutput ? TooltipPosition.RIGHT : TooltipPosition.LEFT), [isOutput]);
    const visuallyDisabled = React.useMemo(() => {
        const isOccupied = !isOutput && port.connected;
        const hasDifferentValueType = circuit.connectionDraft?.type !== port.type;
        const hasSharedNode = circuit.connectionDraft?.node === port.node;
        // const isUnrelatedToConnectionDraft = circuit.connectionDraft !== port;

        return circuit.connectionDraft ? isOccupied || hasDifferentValueType || isOutput || hasSharedNode : false;
    }, [circuit, isOutput, port]);

    React.useEffect(() => {
        if (ref.current) {
            circuit.setPortElement(port.id, ref.current);

            return () => {
                circuit.removePortElement(port.id);
            };
        }
    }, [circuit, port.id]);

    const onMouseDown = React.useCallback(() => {
        if (isOutput) {
            circuit.setConnectionDraft(port as Output<any>);
        }
    }, [isOutput, circuit, port]);

    const onMouseUp = React.useCallback(() => {
        if (!isOutput && circuit.connectionDraft) {
            circuit.commitConnectionDraft(port as Input<any>);
        }
    }, [isOutput, circuit, port]);

    const onClick = React.useCallback(() => {
        if (port.connected) {
            const connections = port instanceof Input ? [port.connection] : port.connections;

            for (const connection of connections) {
                if (connection) {
                    circuit.context?.disconnect(connection);
                }
            }
        }
    }, [circuit, port]);

    return (
        <Tooltip text={port.type.toUpperCase()} position={tooltipPosition}>
            <div
                ref={ref}
                className={portWrapperStyles(
                    port.connected ||
                        (!circuit.connectionDraft && isHovered) ||
                        (!!circuit.connectionDraft && !visuallyDisabled),
                    isOutput,
                    visuallyDisabled
                )}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onMouseUp={onMouseUp}
                onMouseDown={onMouseDown}
            >
                <div
                    className={portTypeStyles(
                        port.connected,
                        isOutput,
                        isHovered && !visuallyDisabled,
                        isPortTypeHovered && !visuallyDisabled
                    )}
                    onMouseEnter={onPortTypeEnter}
                    onMouseLeave={onPortTypeLeave}
                    onClick={onClick}
                >
                    {port.connected && isPortTypeHovered && !visuallyDisabled ? (
                        <Icon name="close" size={12} />
                    ) : (
                        <span>{port.type.charAt(0).toUpperCase()}</span>
                    )}
                </div>
                <span>{port.name}</span>
            </div>
        </Tooltip>
    );
});
