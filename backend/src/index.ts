import 'module-alias/register';
import config from '@/config';
import Server from '@/server';

import { Cron, Cache } from '@/services';
Cron.init();
Cache.init();

export const app = Server.bootstrap().app;
export const server = app.listen(config.port, config.host);