import { Client } from 'pg';

const options = {
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
};

export function getDBClient() {
    const client = new Client(options);
    client.connect();

    return client;
}
