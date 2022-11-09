import express from 'express';
import { v4 as uuid } from 'uuid';

export const requestId: express.RequestHandler = (req, res, next) => {
    req.id = uuid();

    next();
};
