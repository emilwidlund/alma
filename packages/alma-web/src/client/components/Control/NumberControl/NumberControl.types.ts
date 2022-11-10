import { Input, Output } from 'alma-graph';

export interface INumberControlProps {
    port: Input<'float'> | Output<'float'>;
}
