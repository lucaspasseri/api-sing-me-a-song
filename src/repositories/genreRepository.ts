import { connection } from "../database";

export async function getByName(name: string){
    const chosenName = await connection.query(
        `SELECT * FROM genres
        WHERE name = $1`, [name]
    ); 
    
    return chosenName.rows;
}

export async function newOne(name: string){
    const newGenre = await connection.query(
        `INSERT INTO genres (name) 
        VALUES ($1) RETURNING *`, [name]
    );

    return newGenre.rows[0];
}

export async function getAll(){
    const allGenres = await connection.query(
        `SELECT * FROM genres`
    );

    return allGenres.rows;
}