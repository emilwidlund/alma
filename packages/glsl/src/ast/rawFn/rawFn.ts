import { Type, funcall } from '@thi.ng/shader-ast';

import { IParsedFunctionParameter } from '../../core/Processor/Processor.types';

export const defnRaw = (type: Type, id: string, parameters: IParsedFunctionParameter[], body: string) => {
    const defArg = ({ name, type }: IParsedFunctionParameter) => {
        return {
            tag: 'arg',
            type,
            id: name,
            opts: { q: 'in' }
        };
    };

    // @ts-ignore
    const $ = (...xs: any[]) => funcall($, ...xs);
    return Object.assign($, {
        tag: 'rawFn',
        type,
        id,
        args: parameters.map(defArg),
        body
    });
};
