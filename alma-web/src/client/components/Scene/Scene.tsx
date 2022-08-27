import * as React from 'react';

import { sceneWrapperStyles } from './Scene.styles';
import { SceneProps } from './Scene.types';

export const Scene = ({ children }: SceneProps) => {
    return <div className={sceneWrapperStyles}>{children}</div>;
};
