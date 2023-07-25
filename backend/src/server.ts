import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

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
        this.app.use(helmet());
    }
    
    private routes(): void {
    }
}

export default Server;