import { generate } from '@shaderfrog/glsl-parser';
import { Path, visit } from '@shaderfrog/glsl-parser/dist/ast';
import { parse } from '@shaderfrog/glsl-parser/dist/parser/parser';

import { IParsedFunctionDeclaration } from './Processor.types';

export class Processor {
    private function(functions: IParsedFunctionDeclaration[] = []): { enter: (p: Path) => void } {
        return {
            enter: ({
                node: {
                    prototype: { header, parameters = [] },
                    body
                }
            }: Path) => {
                const name = header.name.identifier;
                const args = parameters.map(({ declaration }: any) => ({
                    name: declaration.identifier.identifier,
                    type: declaration.specifier.specifier.token
                }));
                const returnType = header.returnType.specifier.specifier.token;

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
