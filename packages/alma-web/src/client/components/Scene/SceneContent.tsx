import { cx } from '@emotion/css';
import * as React from 'react';

import { sceneContentWrapperStyles } from './SceneContent.styles';
import { SceneContentProps } from './SceneContent.types';

export const SceneContent = ({ className, children }: SceneContentProps) => {
    return <div className={cx(sceneContentWrapperStyles, className)}>{children}</div>;
};
