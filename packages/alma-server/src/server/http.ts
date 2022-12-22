import { RequestListener } from 'http';
import { createServer } from 'https';

export const buildHttpServer = (handler: RequestListener) => {
    return createServer(handler);
};
