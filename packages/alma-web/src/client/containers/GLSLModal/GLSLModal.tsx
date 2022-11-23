import * as React from 'react';

import { IGLSLModalProps } from './GLSLModal.types';

export const GLSLModal = ({ node }: IGLSLModalProps) => {
    const [code, setCode] = React.useState(node.data.glsl);

    const handleChange = React.useCallback(
        e => {
            setCode(e.target.value);
        },
        [setCode]
    );

    const handleSave = React.useCallback(() => {
        node.setGLSL(code);
    }, [code]);

    return (
        <>
            <textarea value={code} onChange={handleChange}></textarea>
            <button onClick={handleSave}>Save</button>
        </>
    );
};
