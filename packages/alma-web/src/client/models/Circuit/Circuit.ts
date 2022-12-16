import { WebGLContext } from 'alma-webgl';

export class Circuit {
    /** Canvas Element */
    canvas: HTMLCanvasElement;
    /** Root Circuit Context */
    context: WebGLContext;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;

        const gl = this.canvas.getContext('webgl2');

        if (!gl) {
            throw new Error('WebGL could not be initialized');
        }

        const video = document.createElement('video');
        const webcamCanvas = document.createElement('canvas');
        const webcamImage = new Image();

        const;

        this.context = new WebGLContext(gl, {
            cameraManager: {
                onInit: onCameraResolverInit,
                textureResolver: this.cameraTextureResolver
            },
            textureManager: {
                textureResolver: this.textureResolver
            },
            nodesCollection: nodes,
            ...(serialized ? serialized : undefined)
        });
    }

    /** Strategy for resolving textures */
    private textureResolver(uri?: string): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.crossOrigin = 'anonymous';
            image.onload = () => resolve(image);
            image.src = uri || '';
        });
    }

    /** Strategy for resolving camera texture */
    private cameraTextureResolver(): HTMLImageElement {
        webcamCanvas.getContext('2d')?.drawImage(video, 0, 0, webcamCanvas.width, webcamCanvas.height);

        webcamImage.src = webcamCanvas.toDataURL('image/jpeg');

        return webcamImage;
    }

    /** Camera Resolver callback */
    private async onCameraResolverInit(): Promise<void> {
        video.width = gl.drawingBufferWidth;
        video.height = gl.drawingBufferHeight;
        webcamCanvas.width = gl.drawingBufferWidth;
        webcamCanvas.height = gl.drawingBufferHeight;
        video.autoplay = true;

        const stream = await navigator.mediaDevices.getUserMedia({
            video: { width: gl.drawingBufferWidth, height: gl.drawingBufferHeight }
        });

        video.srcObject = stream;

        return;
    }
}
