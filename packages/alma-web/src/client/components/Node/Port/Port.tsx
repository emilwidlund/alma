import { Input, Output } from 'alma-graph';
import { startCase } from 'lodash';
import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { useHover } from '../../../hooks/useHover/useHover';
import { useSchematic } from '../../../hooks/useSchematic/useSchematic';
import { Icon } from '../../Icon/Icon';
import { Tooltip } from '../../Tooltip/Tooltip';
import { TooltipPosition } from '../../Tooltip/Tooltip.types';
import { portTypeStyles, portWrapperStyles } from './Port.styles';
import { IPortProps } from './Port.types';

export const Port = observer(({ port }: IPortProps) => {
    const ref = React.useRef<HTMLDivElement>(null);
    const schematic = useSchematic();
    const { onMouseEnter, onMouseLeave, isHovered } = useHover();

    const isOutput = React.useMemo(() => port instanceof Output, [port]);
    const tooltipPosition = React.useMemo(() => (isOutput ? TooltipPosition.RIGHT : TooltipPosition.LEFT), [isOutput]);
    const visuallyDisabled = React.useMemo(() => {
        const isOccupied = !isOutput && port.connected;
        const hasDifferentValueType = schematic.connectionDraft?.type !== port.type;
        const hasSharedNode = schematic.connectionDraft?.node === port.node;
        const isUnrelatedToConnectionDraft = schematic.connectionDraft !== port;

        return schematic.connectionDraft ? isOccupied || hasDifferentValueType || isOutput || hasSharedNode : false;
    }, [schematic, isOutput]);

    React.useEffect(() => {
        if (ref.current) {
            schematic.setPortElement(port.id, ref.current);

            return () => {
                schematic.removePortElement(port.id);
            };
        }
    }, []);

    const onMouseDown = React.useCallback(() => {
        if (isOutput) {
            schematic.setConnectionDraft(port as Output<any>);
        }
    }, [isOutput, schematic]);

    const onMouseUp = React.useCallback(() => {
        if (!isOutput && schematic.connectionDraft) {
            schematic.commitConnectionDraft(port as Input<any>);
        }
    }, [isOutput, schematic]);

    const onClick = React.useCallback(() => {
        if (port.connected) {
            const connections = port instanceof Input ? [port.connection] : port.connections;

            for (const connection of connections) {
                if (connection) {
                    schematic.context?.disconnect(connection);
                }
            }
        }
    }, [schematic, port]);

    return (
        <Tooltip text={startCase(port.type)} position={tooltipPosition}>
            <div
                ref={ref}
                className={portWrapperStyles(port.connected, isOutput, visuallyDisabled)}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onMouseUp={onMouseUp}
                onMouseDown={onMouseDown}
            >
                <div
                    className={portTypeStyles(port.connected, isOutput, isHovered && !visuallyDisabled)}
                    onClick={onClick}
                >
                    {port.connected && isHovered && !visuallyDisabled ? (
                        <Icon name="close" size={12} />
                    ) : (
                        port.type.charAt(0).toUpperCase()
                    )}
                </div>
                <span>{port.name}</span>
            </div>
        </Tooltip>
    );
});
