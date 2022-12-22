import { createServer, RequestListener } from 'http';

export const buildHttpServer = (handler: RequestListener) => {
    return createServer(handler);
};
