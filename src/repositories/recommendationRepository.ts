import { connection } from "../database";

export async function newSong(name: string, youtubeLink: string){
    const newSong = await connection.query(
        `INSERT INTO songs (name, url) 
        VALUES ($1, $2) RETURNING *`, [name, youtubeLink]
    );

    return newSong.rows[0];
}

export async function initializeVote(songId: number){
    const vote = await connection.query(
        `INSERT INTO votes ("songId", quantity)
        VALUES ($1, $2) RETURNING *`, [songId, 0]
    );
    return vote.rows[0];
}

export async function upvote(songId: number){

    const targetSong = await connection.query(
        `SELECT * FROM votes
        WHERE "songId" = $1`, [songId]
    );

    const quantity = targetSong.rows[0].quantity;

    const vote = await connection.query(
        `UPDATE votes SET quantity = $1
        WHERE "songId" = $2`, [quantity+1, songId]
    );
}