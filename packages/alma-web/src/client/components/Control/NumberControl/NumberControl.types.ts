import { NumberInput, NumberOutput } from '../../../../core/api/Port/NumberPort/NumberPort';

export interface INumberControlProps {
    port: NumberInput<never> | NumberOutput<never>;
}
