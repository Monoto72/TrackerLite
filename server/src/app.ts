import express, { type Express, type Request, type Response } from 'express';
import log4js from 'log4js';
import './utils/loadEnv.js'; 
import { initializeDatbase, testConnection } from './config/db.js'

const { getLogger, configure } = log4js;

configure({
    appenders: {
        console: {
            type: "console",
        },
        file: {
            type: "file",
            filename: "logs/app.log",
        },
    },
    categories: {
        default: {
            appenders: ["console", "file"],
            level: "debug",
        },
    },
});

const app: Express = express();
const logger = getLogger();

testConnection()
    .then(() => initializeDatbase())
    .then(() => app.listen(process.env.PORT, () => logger.info(`Server running on http://127.0.0.1:${process.env.PORT}`))
    ).catch((err: Error) => {
        logger.error(`Failled to connect to database! Exiting: ${err}`);
        process.exit(1);
    })


app.get('/', (req: Request, res: Response) => {

    res.send('test')
})

export { app, logger }