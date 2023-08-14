import { generate } from '@shaderfrog/glsl-parser';
import { FunctionNode, Path, visit } from '@shaderfrog/glsl-parser/ast';
import { parse } from '@shaderfrog/glsl-parser/parser/parser';

import { IParsedFunctionDeclaration } from './Processor.types';

export class Processor {
    private function(functions: IParsedFunctionDeclaration[] = []): { enter: (p: Path<FunctionNode>) => void } {
        return {
            enter: ({
                node: {
                    prototype: { header, parameters = [] },
                    body
                }
            }: Path<FunctionNode>) => {
                const name = header.name.identifier;
                const args = parameters.map(declaration => ({
                    name: declaration.identifier?.identifier,
                    // @ts-ignore
                    type: declaration.specifier.specifier.token
                }));
                // @ts-ignore
                const returnType = header.returnType.specifier.specifier.token;

                console.log(name, args, header, parameters);
                functions.push({
                    name,
                    parameters: args,
                    returnType,
                    body: generate(body.statements)
                });
            }
        };
    }

    parse(source: string): IParsedFunctionDeclaration[] {
        const functions: IParsedFunctionDeclaration[] = [];

        const ast = parse(source);

        visit(ast, {
            function: this.function(functions)
        });

        return functions;
    }
}
