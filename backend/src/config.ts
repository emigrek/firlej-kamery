import dotenv from 'dotenv';
dotenv.config();

const config = {
    host: process.env.HOST ?? `localhost`,
    port: Number(process.env.PORT ?? 3000)
};

export default config;