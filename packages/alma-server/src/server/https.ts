import * as fs from 'fs';
import { RequestListener } from 'http';
import { createServer, ServerOptions } from 'https';
import * as path from 'path';

const options: ServerOptions = {
    key: fs.readFileSync(path.join(__dirname, '../../ssl/key.pem')),
    cert: fs.readFileSync(path.join(__dirname, '../../ssl/cert.pem'))
};

export const buildHttpsServer = (handler: RequestListener) => {
    return createServer(options, handler);
};
