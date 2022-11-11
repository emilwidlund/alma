import * as React from 'react';

import { Icon } from '../Icon/Icon';
import { artboardWrapperStyles, fullscreenIconStyles } from './Artboard.styles';
import { IArtboardProps } from './Artboard.types';

export const Artboard = React.forwardRef<HTMLCanvasElement, IArtboardProps>(({ size }, ref) => {
    const wrapperRef = React.useRef<HTMLDivElement>(null);
    const [isInFullscreen, setIsInFullscreen] = React.useState(false);

    React.useEffect(() => {
        const handler = (e: HTMLElementEventMap['fullscreenchange']) => {
            setIsInFullscreen(!!document.fullscreenElement);
        };

        wrapperRef.current?.addEventListener('fullscreenchange', handler);

        return () => {
            wrapperRef.current?.removeEventListener('fullscreenchange', handler);
        };
    }, []);

    const onFullscreenClick = React.useCallback(() => {
        if (wrapperRef.current) {
            wrapperRef.current.requestFullscreen();
        }
    }, []);

    const canvasSize = isInFullscreen ? window.screen : size;

    return (
        <div ref={wrapperRef} className={artboardWrapperStyles}>
            <canvas ref={ref} width={canvasSize.width} height={canvasSize.height} />
            <Icon className={fullscreenIconStyles} name="fullscreen" onClick={onFullscreenClick} />
        </div>
    );
});
