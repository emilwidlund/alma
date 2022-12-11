import { ResolvedUser } from '.';

declare global {
    declare namespace Express {
        export interface Request {
            id: string;
            user?: ResolvedUser | null;
        }
    }
}
