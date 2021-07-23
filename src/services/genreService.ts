import * as genreRepository from "../repositories/genreRepository";

export async function newOne(name: string){

    const chosenName = await genreRepository.getByName(name);

    if(chosenName.length > 0) return false;

    const newGenre = await genreRepository.newOne(name);

    return newGenre;
}

export async function getAll(){
    const allGenres = await genreRepository.getAll();

    return allGenres;
}