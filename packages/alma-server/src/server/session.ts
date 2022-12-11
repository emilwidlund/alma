import express from 'express';
import session from 'express-session';

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
};
