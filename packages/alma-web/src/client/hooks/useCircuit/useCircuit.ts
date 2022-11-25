import * as React from 'react';

import { CircuitContext } from '../../providers/CircuitProvider/CircuitProvider';
import type { ICircuitContextValue } from '../../providers/CircuitProvider/CircuitProvider.types';

export const useCircuit = (): ICircuitContextValue => {
    return React.useContext(CircuitContext);
};
