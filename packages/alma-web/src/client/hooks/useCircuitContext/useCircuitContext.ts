import { nodes, WebGLContext } from 'alma-webgl';
import { autorun } from 'mobx';
import { useEffect, useState } from 'react';

export const useCircuitContext = (ref: React.RefObject<HTMLCanvasElement>) => {
    const [context, setContext] = useState<WebGLContext | undefined>();

    useEffect(() => {
        if (ref.current) {
            const gl = ref.current.getContext('webgl2');

            if (!gl) {
                throw new Error('WebGL could not be initialized');
            }

            const video = document.createElement('video');
            const webcamCanvas = document.createElement('canvas');
            const webcamImage = new Image();

            const onCameraResolverInit = () => {
                return new Promise<void>(resolve => {
                    video.width = gl.drawingBufferWidth;
                    video.height = gl.drawingBufferHeight;
                    webcamCanvas.width = gl.drawingBufferWidth;
                    webcamCanvas.height = gl.drawingBufferHeight;
                    video.autoplay = true;
                    navigator.mediaDevices
                        .getUserMedia({ video: { width: gl.drawingBufferWidth, height: gl.drawingBufferHeight } })
                        .then(stream => {
                            video.srcObject = stream;
                            resolve();
                        });
                });
            };

            const cameraTextureResolver = () =>
                new Promise<TexImageSource>((resolve, reject) => {
                    webcamCanvas.getContext('2d')?.drawImage(video, 0, 0, webcamCanvas.width, webcamCanvas.height);

                    webcamImage.src = webcamCanvas.toDataURL('image/jpeg');

                    resolve(webcamImage);
                });

            const ctx = new WebGLContext(gl, {
                cameraManager: {
                    onInit: onCameraResolverInit,
                    textureResolver: cameraTextureResolver
                },
                nodesCollection: nodes,
                ...JSON.parse(localStorage.getItem('context') || '{}')
            });

            const valueReactionDisposer = autorun(
                () => {
                    localStorage.setItem('context', JSON.stringify(ctx));
                },
                /** Debounce serialization upon changes */
                { delay: 200 }
            );

            setContext(ctx);

            document.addEventListener('fullscreenchange', () => {
                if (ref.current) {
                    ctx.reset();
                }
            });

            return () => {
                ctx?.dispose();
                valueReactionDisposer();
            };
        }
    }, []);

    return context;
};
