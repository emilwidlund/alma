/** eslint-disable @typescript-eslint/no-explicit-any */

import { CloseOutlined } from '@mui/icons-material';
import { Input, Output } from '@usealma/graph';
import clsx from 'clsx';
import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { IPortProps } from './Port.types';
import { useCircuit } from '../../../hooks/useCircuit/useCircuit';
import { useHover } from '../../../hooks/useHover/useHover';
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

    const highlighted =
        port.connected || (!circuit.connectionDraft && isHovered) || (!!circuit.connectionDraft && !visuallyDisabled);

    const portWrapperClassNames = clsx(
        'relative flex flex-row grow-1 items-center py-1 text-xxs font-medium uppercase tracking-wider cursor-pointer select-none transition-opacity',
        {
            'pl-6': isOutput,
            'pr-6': !isOutput,
            'flex-row-reverse': isOutput,
            'flex-row': !isOutput,
            'opacity-30': visuallyDisabled,
            'text-accent': highlighted,
            'text-text-dark': !highlighted
        }
    );

    const portTypeClassNames = clsx(
        'flex flex-col items-center justify-center text-xxs font-medium tracking-normal rounded w-4 h-4 transition-all',
        {
            'bg-red-400': port.connected && isPortTypeHovered,
            'bg-neutral-500': !port.connected && !isHovered,
            'bg-accent': (port.connected && !isPortTypeHovered) || (!port.connected && isHovered),
            'text-white': highlighted,
            'ml-3': isOutput,
            'mr-3': !isOutput
        }
    );

    React.useEffect(() => {
        if (ref.current) {
            circuit.setPortElement(port.id, ref.current);
        }

        return () => {
            circuit.removePortElement(port.id);
        };
// eslint-disabled-next-line react-hooks/exhaustive-deps
    }, []);

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
                className={portWrapperClassNames}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onMouseUp={onMouseUp}
                onMouseDown={onMouseDown}
            >
                <div
                    className={portTypeClassNames}
                    onMouseEnter={onPortTypeEnter}
                    onMouseLeave={onPortTypeLeave}
                    onClick={onClick}
                >
                    {port.connected && isPortTypeHovered && !visuallyDisabled ? (
                        <CloseOutlined fontSize="inherit" />
                    ) : (
                        <span>{port.type.charAt(0).toUpperCase()}</span>
                    )}
                </div>
                <span>{port.name}</span>
            </div>
        </Tooltip>
    );
});
