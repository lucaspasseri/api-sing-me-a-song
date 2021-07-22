import {connection } from "../../src/database";

export async function clearDatabase () {
    await connection.query(`TRUNCATE songs RESTART IDENTITY`);
    await connection.query(`TRUNCATE votes RESTART IDENTITY`);
}
export async function endConnection () {
    await clearDatabase();
    await connection.end();
}