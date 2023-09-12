import { Type, Sym } from '@thi.ng/shader-ast';

export interface RawFn<T extends Type> {
    id: string;
    args: Sym<any>[];
    tag: 'rawFn';
    type: T;
    body: string;
}
