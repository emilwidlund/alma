import { autorun } from 'mobx';
import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { IConnectionProps } from './Connection.types';
import { quadraticCurve } from './Connection.utils';
import { CIRCUIT_SIZE, NODE_POSITION_OFFSET_X } from '../../constants/circuit';
import { useCircuit } from '../../hooks/useCircuit/useCircuit';
import { fromCircuitCartesianPoint } from '../../utils/coordinates/coordinates';

const INPUT_PORT_OFFSET_X = 12;
const INPUT_PORT_OFFSET_Y = 12;

const OUTPUT_PORT_OFFSET_X = 0;
const OUTPUT_PORT_OFFSET_Y = 12;

const defaultPosition = { x: 0, y: 0 };

export const Connection = observer(({ output, point, connection }: IConnectionProps) => {
    const [pathString, setPathString] = React.useState('');
    const [fromPos, setFromPos] = React.useState(defaultPosition);
    const [toPos, setToPos] = React.useState(defaultPosition);

    const circuit = useCircuit();

    const outputElement = connection
        ? circuit.portElements[connection.from.id]
        : output
        ? circuit.portElements[output.id]
        : undefined;
    const inputElement = connection && circuit.portElements[connection.to.id];

    React.useEffect(() => {
        if (outputElement && inputElement) {
            return autorun(() => {
                if (connection) {
                    const outputCartesian = fromCircuitCartesianPoint(
                        { width: CIRCUIT_SIZE, height: CIRCUIT_SIZE },
                        connection.from.node.data.position.x + NODE_POSITION_OFFSET_X,
                        connection.from.node.data.position.y
                    );

                    const inputCartesian = fromCircuitCartesianPoint(
                        { width: CIRCUIT_SIZE, height: CIRCUIT_SIZE },
                        connection.to.node.data.position.x - NODE_POSITION_OFFSET_X,
                        connection.to.node.data.position.y
                    );

                    const outputPortPosition = {
                        x: outputCartesian.x,
                        y: outputCartesian.y + outputElement.offsetTop
                    };

                    const inputPortPosition = {
                        x: inputCartesian.x + inputElement.offsetLeft,
                        y: inputCartesian.y + inputElement.offsetTop
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
    }, [outputElement, inputElement, circuit, connection]);

    React.useEffect(() => {
        if (output && outputElement && point) {
            const outputCartesian = fromCircuitCartesianPoint(
                { width: CIRCUIT_SIZE, height: CIRCUIT_SIZE },
                output.node.data.position.x + NODE_POSITION_OFFSET_X,
                output.node.data.position.y
            );

            const outputPortPosition = {
                x: outputCartesian.x,
                y: outputCartesian.y + outputElement.offsetTop
            };

            const newFromPos = {
                x: outputPortPosition.x + OUTPUT_PORT_OFFSET_X,
                y: outputPortPosition.y + OUTPUT_PORT_OFFSET_Y
            };

            setFromPos(newFromPos);
            setToPos(point);

            setPathString(quadraticCurve(newFromPos, point));
        }
    }, [output, outputElement, point, circuit]);

    const handleClick = React.useCallback(() => {
        if (connection) {
            circuit.context?.disconnect(connection);
        }
    }, [connection, circuit.context]);

    const selectedConnection =
        connection && circuit.selectedNodes?.flatMap(node => node.connections).includes(connection);
    const strokeColor = selectedConnection || output ? '#4444ff' : '#bec2d9';

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
