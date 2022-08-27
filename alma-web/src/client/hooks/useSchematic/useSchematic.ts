import * as React from 'react';

import { SchematicContext } from '../../providers/SchematicProvider/SchematicProvider';
import type { ISchematicContextValue } from '../../providers/SchematicProvider/SchematicProvider.types';

export const useSchematic = (): ISchematicContextValue => {
    return React.useContext(SchematicContext);
};
