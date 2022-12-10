import { PrismaClient } from '@prisma/client';
import express, { Express } from 'express';
import session from 'express-session';
import passport from 'passport';

export const initializePassport = (db: PrismaClient) => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser(async (user: Express.User, done) => {
        const matchingUser = db.user.findFirst({ where: { email: '' } });

        done(null, matchingUser);
    });
};

export const initializeSession = (app: express.Application) => {
    /** Initialize session */
    app.use(
        session({
            genid: req => req.id,
            secret: process.env.ALMA_SESSION_SECRET,
            resave: false,
            saveUninitialized: false
        })
    );

    app.use(passport.initialize());
    app.use(passport.session());
};
