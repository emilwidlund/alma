import { Sym, Type } from '@thi.ng/shader-ast';
import { defaults } from 'lodash';
import { action, makeObservable, observable } from 'mobx';
import { v4 as uuid } from 'uuid';

import { Connection } from '../Connection/Connection';
import { Input } from '../Input/Input';
import { Node } from '../Node/Node';
import { INodeSerialized } from '../Node/Node.types';
import { Output } from '../Output/Output';
import { Port } from '../Port/Port';
import { IContextProps, IContextSerialized } from './Context.types';

export abstract class Context<TRoot extends Node = Node> {
    /** Unique Identifier */
    id: string;
    /** Context Name */
    name: string;
    /** Root Node */
    root!: TRoot;
    /** Nodes */
    nodes: Map<Node['id'], Node>;
    /** Connections */
    connections: Map<Connection<any>['id'], Connection<any>>;
    /** Imported Props */
    props: IContextSerialized;

    constructor(props: IContextProps) {
        const properties = defaults(props, {
            id: uuid(),
            name: 'Untitled',
            nodes: [],
            connections: []
        });

        this.id = properties.id;
        this.name = properties.name;
        this.nodes = new Map();
        this.connections = new Map();
        this.props = properties;

        makeObservable(this, {
            id: observable,
            name: observable,
            nodes: observable,
            connections: observable,
            add: action,
            remove: action,
            connect: action,
            disconnect: action,
            resolveNode: action,
            resolveRootNode: action
        });
    }

    /** Initializes Context */
    public initialize(): TRoot {
        const { nodes, connections } = this.props;

        const portCache = new Map<Port<any>['id'], Port<any>>();

        for (const [_, nodeProps] of nodes) {
            const node = this.resolveNode(nodeProps);

            if (node) {
                this.add(node);
                node.ports.forEach(port => portCache.set(port.id, port));
            }
        }

        for (const [_, connectionProps] of connections) {
            const id = connectionProps.id;
            const from = portCache.get(connectionProps.from) as Output<any>;
            const to = portCache.get(connectionProps.to) as Input<any>;

            if (id && from && to) {
                const connection = new Connection(this, { id, from, to });
                this.connections.set(connection.id, connection);
            }
        }

        return this.resolveRootNode([...this.nodes.values()]);
    }

    /** Resolve Node */
    abstract resolveNode<TNode extends Node>(props: INodeSerialized): TNode;

    /** Resolve Root Node */
    abstract resolveRootNode(nodes: Node[]): TRoot;

    /** Adds node to context */
    public add(node: Node) {
        this.nodes.set(node.id, node);
    }

    /** Removes node from context */
    public remove(node: Node) {
        this.nodes.delete(node.id);
    }

    /** Connects output with input */
    public connect<
        TType extends Type,
        TOutputNode extends Node,
        TOutput extends Output<TType, TOutputNode>,
        TInputNode extends Node,
        TInput extends Input<TType, TInputNode>
    >(output: TOutput, input: TInput) {
        if (!input.validator(output.value)) {
            console.error(`Validation of value from Output ${output.id} to Input ${input.id} failed`);
            return;
        }

        const connection = new Connection(this, { from: output, to: input });
        this.connections.set(connection.id, connection);
    }

    /** Disconnects a given connection */
    public disconnect<TType extends Type, TConnection extends Connection<TType>>(connection: TConnection): void {
        this.connections.delete(connection.id);
        connection.dispose();
    }

    /** Render Context */
    abstract render(outs: Record<string, Sym<any>>): void;

    /** Serializes Context */
    public toJSON() {
        return {
            id: this.id,
            name: this.name,
            nodes: this.nodes,
            connections: this.connections
        };
    }
}
