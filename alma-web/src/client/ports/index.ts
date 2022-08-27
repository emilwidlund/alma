import { Node } from '../../core/api/Node/Node';
import type { BooleanInput, BooleanOutput } from './BooleanPort/BooleanPort';
import type { ColorInput, ColorOutput } from './ColorPort/ColorPort';
import type { NumberInput, NumberOutput } from './NumberPort/NumberPort';
import type { StringInput, StringOutput } from './StringPort/StringPort';
import type { Vector2Input, Vector2Output } from './Vector2Port/Vector2Port';

export type IInput<TNode extends Node> =
    | BooleanInput<TNode>
    | NumberInput<TNode>
    | StringInput<TNode>
    | ColorInput<TNode>
    | Vector2Input<TNode>;

export type IOutput<TNode extends Node> =
    | BooleanOutput<TNode>
    | NumberOutput<TNode>
    | StringOutput<TNode>
    | ColorOutput<TNode>
    | Vector2Output<TNode>;
