import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

import Routes from '@server/routes';

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
    }
    
    private routes(): void {
        this.app.use(Routes.path, Routes.router);
    }
}

export default Server;