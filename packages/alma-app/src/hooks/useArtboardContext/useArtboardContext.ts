import { assign, defMain, Sym, vec4 } from '@thi.ng/shader-ast';
import { GLSLTarget } from '@thi.ng/shader-ast-glsl';
import { compileModel, defQuadModel, defShader, FX_SHADER_SPEC } from '@thi.ng/webgl';
import { Camera, PermissionStatus } from 'expo-camera';
import { ExpoWebGLRenderingContext, GLView } from 'expo-gl';
import { useCallback, useEffect, useRef } from 'react';

export const useArtboardContext = (vertexShaderSource: string, fragmentShaderSource: string) => {
    const glRef = useRef<GLView>(null);
    const cameraRef = useRef<Camera>(null);
    const frameId = useRef<number>();
    const renderingStartedTimestamp = useRef<number>();

    const createCameraTexture = useCallback(async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();

        if (status !== PermissionStatus.GRANTED) {
            throw new Error('Camera permissions denied');
        }

        if (!glRef.current) {
            throw new Error('GL is not initialized');
        }

        return await glRef.current.createCameraTextureAsync(cameraRef.current);
    }, []);

    const createShaders = useCallback(
        (gl: ExpoWebGLRenderingContext) => {
            const vertexShader = gl.createShader(gl.VERTEX_SHADER);

            if (!vertexShader) {
                throw new Error('Vertex Shader could not be created');
            }

            gl.shaderSource(vertexShader, vertexShaderSource);
            gl.compileShader(vertexShader);

            const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

            if (!fragmentShader) {
                throw new Error('Fragment Shader could not be created');
            }

            gl.shaderSource(fragmentShader, fragmentShaderSource);

            gl.compileShader(fragmentShader);

            return {
                vertexShader,
                fragmentShader
            };
        },
        [vertexShaderSource, fragmentShaderSource]
    );

    const createProgram = useCallback(
        (gl: ExpoWebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader) => {
            const program = gl.createProgram();

            if (!program) {
                throw new Error('GL Program could not be created');
            }

            gl.attachShader(program, vertexShader);
            gl.attachShader(program, fragmentShader);
            gl.linkProgram(program);
            gl.useProgram(program);

            return program;
        },
        []
    );

    const createCameraBuffer = useCallback((gl: ExpoWebGLRenderingContext, program: WebGLProgram) => {
        const positionAttrib = gl.getAttribLocation(program, 'position');
        gl.enableVertexAttribArray(positionAttrib);

        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

        const verts = new Float32Array([-1, -1, 1, -1, 1, 1, -1, -1, 1, 1, -1, 1]);
        gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW);

        gl.vertexAttribPointer(positionAttrib, 2, gl.FLOAT, false, 0, 0);

        gl.uniform1i(gl.getUniformLocation(program, 'cameraTexture'), 0);

        gl.uniform2fv(gl.getUniformLocation(program, 'cameraTextureResolution'), [1080, 1920]);

        gl.uniform2fv(gl.getUniformLocation(program, 'resolution'), [gl.drawingBufferWidth, gl.drawingBufferHeight]);

        gl.uniform1f(gl.getUniformLocation(program, 'time'), 0);

        gl.activeTexture(gl.TEXTURE0);
    }, []);

    const renderingLoop = useCallback(
        (gl: ExpoWebGLRenderingContext, program: WebGLProgram, cameraTexture: WebGLTexture) => {
            frameId.current = requestAnimationFrame(renderingLoop.bind(this, gl, program, cameraTexture));

            if (renderingStartedTimestamp.current) {
                gl.uniform1f(
                    gl.getUniformLocation(program, 'time'),
                    (Date.now() - renderingStartedTimestamp.current) / 100
                );
            }

            gl.clearColor(0, 0, 1, 1);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

            gl.bindTexture(gl.TEXTURE_2D, cameraTexture);

            gl.drawArrays(gl.TRIANGLES, 0, 6);

            gl.endFrameEXP();
        },
        []
    );

    const onContextCreate = useCallback(
        async (gl: ExpoWebGLRenderingContext) => {
            const model = compileModel(gl, {
                ...defQuadModel({ uv: false }),
                shader: defShader(gl, {
                    ...FX_SHADER_SPEC,
                    fs: (
                        gl: GLSLTarget,
                        uniforms: Record<string, Sym<any>>,
                        _: Record<string, Sym<any>>,
                        outs: Record<string, Sym<any>>
                    ) => [defMain(() => [assign(outs.fragColor, vec4(1, 0, 0, 1))])],
                    uniforms: {
                        resolution: ['vec2', [gl.drawingBufferWidth, gl.drawingBufferHeight]],
                        time: ['float', 0],
                        mouse: ['vec2', [0, 0]]
                    }
                })
            });

            console.log(model);

            const cameraTexture = await createCameraTexture();

            const aspect = 1080 / 1920;

            const width = gl.drawingBufferWidth;
            const height = gl.drawingBufferHeight;

            gl.viewport(0, 0, width, height);
            gl.clearColor(0, 1, 1, 1);

            const { vertexShader, fragmentShader } = createShaders(gl);

            const program = createProgram(gl, vertexShader, fragmentShader);

            createCameraBuffer(gl, program);

            renderingStartedTimestamp.current = Date.now();

            renderingLoop(gl, program, cameraTexture);

            // const { width, height } = Dimensions.get('screen');

            // const renderer = new Renderer({ gl });
            // renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

            // const scene = new THREE.Scene();
            // const quad = new THREE.PlaneBufferGeometry(width, height, 1, 1);

            // const texture = new THREE.Texture();

            // const material = new THREE.MeshBasicMaterial({ map: texture });

            // const properties = renderer.properties.get(texture);
            // properties.__webglTexture = cameraTexture;
            // properties.__webglInit = true;

            // const mesh = new THREE.Mesh(quad, material);
            // scene.add(mesh);

            // const camera = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, 0, 1);

            // renderer.render(scene, camera);

            // frameId.current = requestAnimationFrame(renderingLoop.bind(this, renderer, scene, camera));
        },
        [createCameraTexture, createShaders, createProgram, createProgram, renderingLoop]
    );

    useEffect(() => {
        return () => {
            if (frameId.current) {
                cancelAnimationFrame(frameId.current);
            }
        };
    }, []);

    return {
        glRef,
        cameraRef,
        onContextCreate
    };
};
