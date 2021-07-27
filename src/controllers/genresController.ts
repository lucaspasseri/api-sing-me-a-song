import { Request, Response } from "express";
import * as genreService from "../services/genreService";
import { genreSchema } from "../schemas/genreSchema";

export async function create(req: Request, res: Response){
    try {

        const validationErros = genreSchema.validate(req.body).error;

        if(validationErros) return res.sendStatus(400);

        const {name} = req.body;

        const newGenre = await genreService.newOne(name);

        if(!newGenre){
            return res.sendStatus(409);
        }

        res.send(newGenre);
    } catch(err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export async function getAll(req: Request, res: Response){
    try {
        const allGenres = await genreService.getAll();

        res.send(allGenres);
    } catch(err) {
        console.log(err);
        res.sendStatus(500);
    }

}

export async function getSummary(req: Request, res:Response){
    try {

        res.sendStatus(200);

    } catch(err) {
        console.log(err);
        res.sendStatus(500);
    }
}