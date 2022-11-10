import { autorun } from 'mobx';
import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { useSchematic } from '../../hooks/useSchematic/useSchematic';
import { IConnectionProps } from './Connection.types';
import { quadraticCurve } from './Connection.utils';

const INPUT_PORT_OFFSET_X = 12;
const INPUT_PORT_OFFSET_Y = 12;

const OUTPUT_PORT_OFFSET_X = 12;
const OUTPUT_PORT_OFFSET_Y = 12;

const defaultPosition = { x: 0, y: 0 };

export const Connection = observer(({ output, point, connection }: IConnectionProps) => {
    const [pathString, setPathString] = React.useState('');
    const [fromPos, setFromPos] = React.useState(defaultPosition);
    const [toPos, setToPos] = React.useState(defaultPosition);

    const schematic = useSchematic();

    const outputElement = connection
        ? schematic.portElements[connection.from.id]
        : output
        ? schematic.portElements[output.id]
        : undefined;
    const inputElement = connection && schematic.portElements[connection.to.id];

    React.useEffect(() => {
        if (outputElement && inputElement) {
            return autorun(() => {
                if (connection) {
                    const outputPortPosition = {
                        x: connection.from.node.data.position.x + outputElement.offsetLeft + outputElement.clientWidth,
                        y: connection.from.node.data.position.y + outputElement.offsetTop
                    };
                    const inputPortPosition = {
                        x: connection.to.node.data.position.x + inputElement.offsetLeft,
                        y: connection.to.node.data.position.y + inputElement.offsetTop
                    };

                    const newFromPos = {
                        x: outputPortPosition.x + OUTPUT_PORT_OFFSET_X,
                        y: outputPortPosition.y + OUTPUT_PORT_OFFSET_Y
                    };

                    const newToPos = {
                        x: inputPortPosition.x - INPUT_PORT_OFFSET_X,
                        y: inputPortPosition.y + INPUT_PORT_OFFSET_Y
                    };

                    setFromPos(newFromPos);
                    setToPos(newToPos);

                    setPathString(quadraticCurve(newFromPos, newToPos));
                }
            });
        }
    }, [outputElement, inputElement, schematic]);

    React.useEffect(() => {
        if (output && outputElement && point) {
            const outputPortPosition = {
                x: output.node.data.position.x + outputElement.offsetLeft + outputElement.clientWidth,
                y: output.node.data.position.y + outputElement.offsetTop
            };

            const newFromPos = {
                x: outputPortPosition.x + OUTPUT_PORT_OFFSET_X,
                y: outputPortPosition.y + OUTPUT_PORT_OFFSET_Y
            };

            setFromPos(newFromPos);
            setToPos(point);

            setPathString(quadraticCurve(newFromPos, point));
        }
    }, [output, outputElement, point, schematic]);

    const handleClick = React.useCallback(() => {
        if (connection) {
            schematic.context?.disconnect(connection);
        }
    }, [connection]);

    const selectedConnection = connection && schematic.selectedNode?.connections.includes(connection);
    const strokeColor =
        selectedConnection || output
            ? getComputedStyle(document.documentElement).getPropertyValue('--accent-color')
            : getComputedStyle(document.documentElement).getPropertyValue('--border-color');

    return (
        <g>
            <path
                className="connector"
                d={pathString}
                fill="none"
                strokeWidth="2"
                stroke={strokeColor}
                onClick={handleClick}
            />
            <path
                className="port"
                d={`M${fromPos.x},${fromPos.y},${fromPos.x + 2},${fromPos.y}`}
                fill="none"
                strokeWidth="8"
                stroke={strokeColor}
            />
            <path
                className="port"
                d={`M${toPos.x - 2},${toPos.y},${toPos.x},${toPos.y}`}
                fill="none"
                strokeWidth="8"
                stroke={strokeColor}
            />
        </g>
    );
});
