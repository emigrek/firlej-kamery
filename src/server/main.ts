import 'module-alias/register';
import { Express } from 'express';
import ViteExpress from 'vite-express';
import dotenv from 'dotenv';

dotenv.config({
    path: process.env.NODE_ENV === "production" ? ".env" : ".env.local"
});

import { config } from '@server/config';
import Server from '@server/server';

import { snapshot } from './tasks/snapshot';
snapshot.execute();

export const app = Server.bootstrap().app;
export const server = app.listen(config.port, config.host);

ViteExpress.bind(app as Express, server);