import * as recommendationRepository from "../repositories/recommendationRepository";
import {Song} from "../interfaces/Song";

export async function newOne(name: string, youtubeLink: string):Promise<Song>{

    const newSong = await recommendationRepository.newSong(name, youtubeLink);

    return newSong;
}

export async function vote(songId: number, path: string):Promise<Song>{
    const pathArray = path.split("/");

    let type:string;

    if(pathArray.includes("upvote")){
        type = "upvote";
    } else {
        type = "downvote";
    }

    const success = await recommendationRepository.vote(songId, type);

    return success;
}

function randomIndex(recommendationsLength: number):number{
    return Math.floor(Math.random()* (recommendationsLength));
}

export async function getRandom():Promise<Song>{
    let recommendations;

    const seventyPercentOfTheTime = (Math.random()*10 > 3);

    if(seventyPercentOfTheTime){
        recommendations = await recommendationRepository.getHighRankingSongs();
    } else {
        recommendations = await recommendationRepository.getLowRankingSongs();
    }

    if(recommendations.length === 0) {
        recommendations = await recommendationRepository.getRandomSongs();
    }

    if(recommendations.length === 0) {
        return null;
    }

    const index = randomIndex(recommendations.length);

    return recommendations[index];
}

export async function getLimitedTopSongs(amount: number):Promise<Song[]>{
    const songs = await recommendationRepository.getTopSongs();

    const limitedSongs = songs.slice(0,amount);

    return limitedSongs;
}

export async function newOneWithGenres(name: string, youtubeLink: string, genresIds: any):Promise<Song>{

    const newSong = await recommendationRepository.newSongWithGenres(name, youtubeLink, genresIds);

    return newSong;
}