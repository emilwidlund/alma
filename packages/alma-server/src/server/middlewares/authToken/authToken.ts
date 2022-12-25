import { PrismaClient } from '@prisma/client';
import * as express from 'express';
import * as jwt from 'jsonwebtoken';

import { AuthJWTPayload } from '../../../../types';

/**
 * Extracts authToken and looks up user in Database
 */
export const authToken =
    (db: PrismaClient) => (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const authHeader = req.headers['authorization'];
        const token = (authHeader && authHeader.split(' ')[1]) || req.cookies['authToken'];

        if (token) {
            jwt.verify(token, process.env.ALMA_JWT_SECRET, { algorithms: ['HS256'] }, async (err, user) => {
                if (user && typeof user !== 'string' && 'userId' in user) {
                    const userId: string = 'userId' in (user as AuthJWTPayload) ? user?.userId : undefined;

                    if (userId) {
                        req.user = await db.user.findUnique({ where: { id: userId } });

                        next();
                    } else {
                        next();
                    }
                } else {
                    next();
                }
            });
        } else {
            next();
        }
    };
