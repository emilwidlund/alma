/** eslint-disable @typescript-eslint/no-explicit-any */

import { Input, Output } from '@usealma/graph';

export interface IPortProps {
    port: Input<any> | Output<any>;
}
