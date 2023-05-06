import * as React from 'react';

import { EditorContext } from '../../providers/EditorProvider/EditorProvider';

export const useEditor = () => {
    return React.useContext(EditorContext);
};
