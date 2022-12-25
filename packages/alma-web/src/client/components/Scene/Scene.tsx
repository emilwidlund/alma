import { cx } from '@emotion/css';
import * as React from 'react';

import { sceneWrapperStyles } from './Scene.styles';
import { SceneProps } from './Scene.types';

export const Scene = ({ className, children }: SceneProps) => {
    return <div className={cx([sceneWrapperStyles, className])}>{children}</div>;
};
