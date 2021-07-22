import pg from 'pg';
import "./setup";

const { Pool } = pg;

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    database: process.env.DB_DATABASE
};

const connection = new Pool(config);

export { connection };