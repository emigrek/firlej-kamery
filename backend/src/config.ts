import dotenv from 'dotenv';
dotenv.config();

const config = {
    host: process.env.HOST || `127.0.0.1`,
    port: Number(process.env.PORT || 3000)
};

export default config;