import * as recommendationRepository from "../repositories/recommendationRepository";

export async function newOne(name: string, youtubeLink: string){

    const newSong = await recommendationRepository.newSong(name, youtubeLink);

    const songId = newSong.id;

    const initializeVote = await recommendationRepository.initializeVote(songId);
    return true;
}