import fs from 'fs';
import { RequestListener } from 'http';
import { createServer } from 'https';
import path from 'path';

const options = {
    key: fs.readFileSync(path.resolve(__dirname, '../../ssl/_.alma.sh/key.pem')),
    cert: fs.readFileSync(path.resolve(__dirname, '../../ssl/_.alma.sh/cert.pem'))
};

export const buildHttpsServer = (handler: RequestListener) => {
    return createServer(options, handler);
};
