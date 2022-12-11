import { User } from '@prisma/client';
import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import passport from 'passport';

import { IContext } from '../../types';
import { Route } from '../server/routes';
import { googleStrategy } from './google/strategy';

/**
 * Returns a signed JWT token with a user identifier as its payload
 * Valid for 15 minutes
 */
export const getUserJWT = (user: User): string => {
    return jwt.sign({ userId: user.id }, process.env.ALMA_JWT_SECRET, { algorithm: 'HS256', expiresIn: '15m' });
};

/**
 * Sends a JSON response with a signed User JWT
 */
export const authSuccessCallback = (req: express.Request, res: express.Response) => {
    if (req.user) {
        res.json({
            data: {
                authToken: getUserJWT(req.user),
                expiresIn: 900
            },
            error: null
        });
    } else {
        res.status(401).json({
            data: null,
            error: 'Authentication failed'
        });
    }
};

/**
 * Initializes the Passport strategies used for authentication
 */
export const initializePassport = (app: express.Application, context: IContext) => {
    /** Register Strategies */
    passport.use(googleStrategy(context));

    /** Google OAuth */
    app.get(Route.GOOGLE_OAUTH, passport.authenticate('google', { scope: ['profile'] }));

    app.get(
        Route.GOOGLE_OAUTH_REDIRECT,
        passport.authenticate('google', { failureRedirect: '/login' }),
        authSuccessCallback
    );

    /** Github OAuth */

    /** Adobe OAuth */

    /** Figma OAuth */
};
