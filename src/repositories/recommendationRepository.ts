import { connection } from "../database";

export async function newSong(name: string, youtubeLink: string){
    const newSong = await connection.query(
        `INSERT INTO songs (name, url, score) 
        VALUES ($1, $2, $3) RETURNING *`, [name, youtubeLink, 0]
    );

    return newSong.rows[0];
}

export async function vote(songId: number, type: string){

    const targetSong = await connection.query(
        `SELECT * FROM songs
        WHERE id = $1`, [songId]
    );

    if(!targetSong.rows[0]){
        return false;
    }

    const score = targetSong.rows[0]?.score;

    let vote;

    if(type === "upvote"){
        vote = await connection.query(
            `UPDATE songs SET score = $1
            WHERE id = $2 RETURNING *`, [score+1, songId]
        );
    } else {

        if(score===-5){

            const deleteSong = await connection.query(
                `DELETE FROM songs WHERE id = $1`, [songId]
            );

            return "deleted";

        } else {
            vote = await connection.query(
                `UPDATE songs SET score = $1
                WHERE id = $2 RETURNING *`, [score-1, songId]
            );
        }    
    }

    return vote?.rows[0];
}

export async function getHighRankingSongs(){
    const highRankingSongs = await connection.query(
        `SELECT * FROM songs
        WHERE score > 10`
    );
    return highRankingSongs.rows;
}

export async function getLowRankingSongs(){
    const lowRankingSongs = await connection.query(
        `SELECT * FROM songs
        WHERE score <= 10`
    );
    return lowRankingSongs.rows;
}

export async function getRandomSongs(){
    const randomSongs = await connection.query(
        `SELECT * FROM songs`
    );
    return randomSongs.rows;
}