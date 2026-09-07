import express, { type Express, type Request, type Response } from 'express';
import log4js from 'log4js';

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

const PORT: number = 3000;

const app: Express = express();
const logger = getLogger();


app.get('/', (req: Request, res: Response) => {

    res.send('test')
})

app.listen(PORT, () => {
    logger.info(`Server running on http://127.0.0.1:${PORT}`);
});