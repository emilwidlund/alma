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
import {
    shaderRouteCanvasStyles,
    shaderRouteContentWrapperStyles,
    shaderRouteWrapperStyles
} from './ShaderRoute.styles';

const defaultCode = `void main() {
    // Time varying pixel color
    vec3 col = 0.5 + 0.5 * cos(time + v_uv.xyx + vec3(0., 2., 4.));

    // Output to screen
    fragColor = vec4(col, 1.0);
}`;

export const ShaderRoute = () => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const [code, setCode] = React.useState<string>(defaultCode);

    const { projectId } = useParams();
    const { data: getProjectData } = useQuery<Query>(GET_PROJECT_QUERY, { variables: { id: projectId } });

    const handleChange: ChangeHandler = React.useCallback(code => {
        setCode(code);
    }, []);

    React.useEffect(() => {
        if (canvasRef.current) {
            const { width, height } = canvasRef.current.getBoundingClientRect();

            canvasRef.current.width = width;
            canvasRef.current.height = height;

            const ctx: WebGLRenderingContext = canvasRef.current.getContext('webgl2')!;

            try {
                const model = defQuadModel({ uv: false });

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
                const handle = setInterval(() => {
                    const time = (Date.now() - t0) * 0.001;
                    model.uniforms!.time = time;
                    draw(model);
                });

                return () => {
                    clearInterval(handle);
                };
            } catch (err) {}
        }
    }, [code]);

    if (!getProjectData?.getProject) {
        return null;
    }

    return (
        <Scene className={shaderRouteWrapperStyles}>
            <ProjectHeaderContainer project={getProjectData.getProject} />
            <div className={shaderRouteContentWrapperStyles}>
                <CodeEditor code={code} onChange={handleChange} />
                <canvas className={shaderRouteCanvasStyles} ref={canvasRef} width={300} height={240} />
            </div>
        </Scene>
    );
};
