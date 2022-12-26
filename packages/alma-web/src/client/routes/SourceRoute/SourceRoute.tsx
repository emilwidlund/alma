import { useQuery } from '@apollo/client';
import { compileModel, defQuadModel, defShader, draw, FX_SHADER_SPEC_UV, ShaderSpec } from '@thi.ng/webgl';
import * as React from 'react';
import { ChangeHandler } from 'react-monaco-editor';
import { useParams } from 'react-router-dom';

import { Query } from '../../../generated/graphql';
import GET_PROJECT_QUERY from '../../apollo/queries/getProject.gql';
import { CodeEditor } from '../../components/CodeEditor/CodeEditor';
import { Scene } from '../../components/Scene/Scene';
import { ProjectHeaderContainer } from '../../containers/ProjectHeaderContainer/ProjectHeaderContainer';
import { useCircuit } from '../../hooks/useCircuit/useCircuit';
import {
    sourceRouteCanvasStyles,
    sourceRouteContentWrapperStyles,
    sourceRouteWrapperStyles
} from './SourceRoute.styles';

const defaultCode = `void main() {
    // Time varying pixel color
    vec3 col = 0.5 + 0.5 * cos(time + v_uv.xyx + vec3(0., 2., 4.));

    // Output to screen
    fragColor = vec4(col, 1.0);
}`;

export const SourceRoute = () => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const [isDirty, setIsDirty] = React.useState(false);
    const [code, setCode] = React.useState<string>(defaultCode);
    const circuit = useCircuit();

    const { projectId } = useParams();
    const { data: getProjectData } = useQuery<Query>(GET_PROJECT_QUERY, { variables: { id: projectId } });

    const handleChange: ChangeHandler = React.useCallback(
        code => {
            setCode(code);

            if (!isDirty) {
                setIsDirty(true);
            }
        },
        [circuit]
    );

    React.useEffect(() => {
        if (canvasRef.current) {
            const { width, height } = canvasRef.current.getBoundingClientRect();

            canvasRef.current.width = width;
            canvasRef.current.height = height;
        }
    }, []);

    React.useEffect(() => {
        if (getProjectData?.getProject.type === 'SHADER_SOURCE') {
            setCode(getProjectData?.getProject.source || defaultCode);
        }
    }, [getProjectData?.getProject.source]);

    React.useEffect(() => {
        if (canvasRef.current) {
            const { width, height } = canvasRef.current;

            const ctx: WebGLRenderingContext = canvasRef.current.getContext('webgl2')!;

            try {
                const model = defQuadModel({ uv: true });

                const shaderSpec: ShaderSpec = {
                    ...FX_SHADER_SPEC_UV,
                    fs: code,
                    uniforms: {
                        resolution: ['vec2', [width, height]],
                        time: 'float'
                    }
                };

                model.shader = defShader(ctx, shaderSpec);

                compileModel(ctx, model);

                const t0 = Date.now();

                const render = () => {
                    handle = requestAnimationFrame(render);

                    const time = (Date.now() - t0) * 0.001;
                    model.uniforms!.time = time;
                    draw(model);
                };

                let handle = requestAnimationFrame(render);

                return () => {
                    cancelAnimationFrame(handle);
                };
            } catch (err) {
                console.log(err);
            }
        }
    }, [code]);

    return (
        <Scene className={sourceRouteWrapperStyles}>
            {getProjectData && (
                <ProjectHeaderContainer
                    project={getProjectData.getProject}
                    isDirty={isDirty}
                    setIsDirty={setIsDirty}
                    source={code}
                />
            )}
            <div className={sourceRouteContentWrapperStyles}>
                <CodeEditor code={code} onChange={handleChange} />
                <canvas ref={canvasRef} className={sourceRouteCanvasStyles} width={300} height={240} />
            </div>
        </Scene>
    );
};
