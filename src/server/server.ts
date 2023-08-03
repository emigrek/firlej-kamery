import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

import Routes from '@server/routes';
import { Cron, Cache } from '@server/services';

class Server {
    public static bootstrap(): Server {
        return new Server();
    }

    public app: express.Application;

    constructor() {
        this.app = express();

        this.init();
        this.routes();
    }

    private init(): void {
        this.app.use(cors());
        this.app.use(helmet({
            contentSecurityPolicy: false
        }));

        Cron.init();
        Cache.init();
    }

    private routes(): void {
        this.app.use(Routes.path, Routes.router);
    }
}

export default Server;