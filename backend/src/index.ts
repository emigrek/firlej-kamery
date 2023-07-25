import 'module-alias/register';
import config from '@/config';
import Server from '@/server';

export const app = Server.bootstrap().app;
export const server = app.listen(config.port, config.host);