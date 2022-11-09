import { defaults } from 'lodash';
import { action, makeObservable, observable } from 'mobx';
import { v4 as uuid } from 'uuid';

import type { IContextProps } from './Context.types';
import { Node } from '../Node/Node';
import { Connection } from '../Connection/Connection';
import { Output } from '../Output/Output';
import { Input } from '../Input/Input';
import type { IConnectionProps } from '../Connection/Connection.types';
import type { INodeSerialized, NodeConstructor } from '../Node/Node.types';

export class Context<
    TNodeConstructors extends Record<string, NodeConstructor<unknown, unknown>> = Record<
        string,
        NodeConstructor<unknown, unknown>
    >
> {
    /** Node Constructor collection */
    public nodeConstructors: TNodeConstructors;

    /** Unique Identifier */
    @observable
    public id: string;

    /** Node Collection */
    @observable
    public nodes: Map<string, Node>;

    /** Connection Collection */
    @observable
    public connections: Map<string, Connection<Output, Input>>;

    constructor(nodeConstructors: TNodeConstructors, props?: IContextProps) {
        const { id, nodes, connections } = defaults(props, {
            id: uuid(),
            nodes: [],
            connections: []
        });

        this.id = id;
        this.nodes = new Map();
        this.connections = new Map();
        this.nodeConstructors = nodeConstructors;

        this.initializeNodes(nodes);
        this.initializeConnections(connections);

        makeObservable(this);
    }

    /** Initializes nodes */
    @action
    private initializeNodes(nodes?: INodeSerialized[]): void {
        nodes?.forEach(({ nodeConstructor, ...nodeProps }) => {
            const constructor = this.nodeConstructors[nodeConstructor];

            if (!nodeConstructor) {
                throw new Error(`Node Constructor with name ${nodeConstructor} does not exist`);
            }

            new constructor(this, nodeProps);
        });
    }

    /** Initializes connections */
    @action
    private initializeConnections(connections: IConnectionProps[]): void {
        connections?.forEach(({ id, outputId, inputId }) => {
            let output: Output | undefined;
            let input: Input | undefined;

            for (const node of this.nodes.values()) {
                for (const out of Object.values(node.outputs)) {
                    if (out.id === outputId) {
                        output = out;
                    }
                }

                for (const inp of Object.values(node.inputs)) {
                    if (inp.id === inputId) {
                        input = inp;
                    }
                }
            }

            if (!output)
                throw new Error(
                    `Output with identifier ${outputId} is not bound to context with identifier ${this.id}`
                );

            if (!input)
                throw new Error(`Input with identifier ${inputId} is not bound to context with identifier ${this.id}`);

            this.connect(output, input, { id, outputId, inputId });
        });
    }

    /** Adds node to Context */
    @action
    public add<TNode extends Node>(node: TNode): void {
        this.nodes.set(node.id, node);
    }

    /** Removes node from Context */
    @action
    public remove<TNode extends Node>(node: TNode): boolean {
        if ('dispose' in node) {
            node.dispose();
        }

        return this.nodes.delete(node.id);
    }

    /** Connects output and input */
    @action
    public connect<TOutput extends Output, TInput extends Input>(
        output: TOutput,
        input: TInput,
        props?: IConnectionProps
    ): Connection<TOutput, TInput> {
        const connection = new Connection(this, output, input, props);
        this.connections.set(connection.id, connection);

        return connection;
    }

    /** Disconnects an established connection */
    @action
    public disconnect<TOutput extends Output, TInput extends Input>(connection: Connection<TOutput, TInput>): void {
        if (this.connections.has(connection.id)) {
            connection.dispose();
            this.connections.delete(connection.id);
        } else {
            throw new Error(
                `Connection with identifier ${connection.id} is not bound to context with identifier ${this.id}`
            );
        }
    }

    /** Serilizes the Context */
    public toJSON(): IContextProps {
        return {
            id: this.id,
            nodes: Array.from(this.nodes.values()).map(node => node.toJSON()),
            connections: Array.from(this.connections.values()).map(connection => connection.toJSON())
        };
    }
}
