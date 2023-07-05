import { Type } from '@thi.ng/shader-ast';

export interface IParsedFunctionParameter {
    name: string;
    type: Type;
}

export interface IParsedFunctionDeclaration {
    name: string;
    parameters: IParsedFunctionParameter[];
    returnType: Type;
    body: string;
}
