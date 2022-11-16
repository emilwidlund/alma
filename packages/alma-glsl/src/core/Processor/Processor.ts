import { AstNode, Path, visit } from '@shaderfrog/glsl-parser/dist/ast';
import { parse } from '@shaderfrog/glsl-parser/dist/parser/parser';
import * as shaderAst from '@thi.ng/shader-ast';

import { IParsedFunctionDeclaration } from './Processor.types';

const cache = new Map();

export class Processor {
    private attachShaderAst(node: AstNode, shaderAst: any) {
        const id = Math.random();
        cache.set(id, shaderAst);

        return { ...node, id };
    }

    private declaration(): { exit: (p: Path) => void } {
        return {
            exit: p => {
                console.log(p.node);
            }
        };
    }

    private floatConstant(): { enter: (p: Path) => void } {
        return {
            enter: p => {
                // @ts-ignore
                p.replaceWith(this.attachShaderAst(p.node, shaderAst.float(p.node.token)));
            }
        };
    }

    private binary(): { enter: (p: Path) => void } {
        return {
            enter: p => {
                switch (p.node.operator.literal) {
                    case '+':
                        p.replaceWith(this.attachShaderAst(p.node, shaderAst.add(p.node.left, p.node.right)));
                        break;
                    case '-':
                        p.replaceWith(this.attachShaderAst(p.node, shaderAst.sub(p.node.left, p.node.right)));
                        break;
                    case '*':
                        p.replaceWith(this.attachShaderAst(p.node, shaderAst.mul(p.node.left, p.node.right)));
                        break;
                    case '/':
                        p.replaceWith(this.attachShaderAst(p.node, shaderAst.div(p.node.left, p.node.right)));
                        break;
                    case '%':
                        p.replaceWith(this.attachShaderAst(p.node, shaderAst.mod(p.node.left, p.node.right)));
                        break;
                }
            }
        };
    }

    private functionPrototype(functions: IParsedFunctionDeclaration[] = []): { enter: (p: Path) => void } {
        return {
            enter: ({ node: { header, parameters } }: Path) => {
                const name = header.name.identifier;
                const args = parameters.map(({ declaration }: any) => ({
                    name: declaration.identifier.identifier,
                    type: declaration.specifier.specifier.token
                }));
                const returnType = header.returnType.specifier.specifier.token;

                functions.push({
                    name,
                    parameters: args,
                    returnType
                });
            }
        };
    }

    parse(source: string): IParsedFunctionDeclaration[] {
        const functions: IParsedFunctionDeclaration[] = [];

        const ast = parse(source);

        visit(ast, {
            declaration: this.declaration(),
            float_constant: this.floatConstant(),
            binary: this.binary(),
            function_prototype: this.functionPrototype(functions)
        });

        return functions;
    }
}
