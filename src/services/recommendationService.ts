import * as recommendationRepository from "../repositories/recommendationRepository";

export async function newOne(name: string, youtubeLink: string){

    const newSong = await recommendationRepository.newSong(name, youtubeLink);

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

function randomIndex(recommendationsLength: number){
    return Math.floor(Math.random()* (recommendationsLength));
}

export async function getRandom(){
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
        return false;
    }

    const index = randomIndex(recommendations.length);

    return recommendations[index];
}

export async function getLimitedTopSongs(amount: number){
    const songs = await recommendationRepository.getTopSongs();

    const limitedSongs = songs.slice(0,amount);

    return limitedSongs;
}

export async function newOneWithGenres(name: string, youtubeLink: string, genresIds: any){

    const newSong = await recommendationRepository.newSongWithGenres(name, youtubeLink, genresIds);

    return newSong;
}