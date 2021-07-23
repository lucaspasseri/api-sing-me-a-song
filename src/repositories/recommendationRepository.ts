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

export async function vote(songId: number, type: string){

    const targetSong = await connection.query(
        `SELECT * FROM votes
        WHERE "songId" = $1`, [songId]
    );

    const quantity = targetSong.rows[0]?.quantity;

    if(!quantity && quantity !== 0){
        return false;
    }

    let vote;

    if(type === "upvote"){
        vote = await connection.query(
            `UPDATE votes SET quantity = $1
            WHERE "songId" = $2 RETURNING *`, [quantity+1, songId]
        );
    } else {

        if(quantity===-5){

            const deleteSong = await connection.query(
                `DELETE FROM songs WHERE id = $1`, [songId]
            );

            const deleteVotes = await connection.query(
                `DELETE FROM votes WHERE "songId" = $1`, [songId]
            );

            return "deleted";

        } else {
            vote = await connection.query(
                `UPDATE votes SET quantity = $1
                WHERE "songId" = $2 RETURNING *`, [quantity-1, songId]
            );
        }    
    }

    return vote?.rows[0];
}

export async function getHighRankingSongs(){
    const highRankingSongs = await connection.query(
        `SELECT * FROM songs
        JOIN votes ON songs.id = votes."songId"
        WHERE quantity > 10`
    );
    return highRankingSongs.rows;
}

export async function getLowRankingSongs(){
    const lowRankingSongs = await connection.query(
        `SELECT * FROM songs
        JOIN votes ON songs.id = votes."songId"
        WHERE quantity <= 10`
    );
    return lowRankingSongs.rows;
}