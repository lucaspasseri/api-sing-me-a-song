import * as recommendationRepository from "../repositories/recommendationRepository";

export async function newOne(name: string, youtubeLink: string){

    const newSong = await recommendationRepository.newSong(name, youtubeLink);

    const songId = newSong.id;

    const initializeVote = await recommendationRepository.initializeVote(songId);
    return newSong;
}

export async function vote(songId: number, path: string){
    const pathArray = path.split("/");

    let type;

    if(pathArray.includes("upvote")){
        type = "upvote";
    } else {
        type = "downvote";
    }

    const success = await recommendationRepository.vote(songId, type);

    return success;
}