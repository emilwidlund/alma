import { PrismaClient, User } from '@prisma/client';
import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import passport from 'passport';

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
        const jwt = getUserJWT(req.user);
        res.cookie('authToken', jwt, { sameSite: 'lax', httpOnly: true, secure: true });

        res.json({
            data: {
                authToken: jwt,
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
export const initializePassport = (app: express.Application, db: PrismaClient) => {
    /** Register Strategies */
    passport.use(googleStrategy(db));

    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (user: User, done) {
        done(null, user);
    });

    /** Google OAuth */
    app.get(Route.GOOGLE_OAUTH, passport.authenticate('google', { scope: ['profile', 'email'] }));

    app.get(
        Route.GOOGLE_OAUTH_REDIRECT,
        passport.authenticate('google', { failureRedirect: '/login' }),
        authSuccessCallback
    );

    /** Github OAuth */

    /** Adobe OAuth */

    /** Figma OAuth */
};
