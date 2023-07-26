import 'module-alias/register';
import config from '@/config';
import Server from '@/server';

import { Cron } from '@/services';
import { tasks } from './tasks';
Cron.init();

tasks.at(0)?.execute();

export const app = Server.bootstrap().app;
export const server = app.listen(config.port, config.host);