import { Request, Response } from "express";
import * as recommendationService from "../services/recommendationService";
import { recommendationSchema } from "../schemas/recommendationSchema";
import { recommendationWithGenresSchema } from "../schemas/recommendationsWithGenresSchema";

export async function create(req: Request, res: Response){
    try{
        const validationErros = recommendationSchema.validate(req.body).error;

        if(validationErros) return res.sendStatus(400);

        const {name, youtubeLink} = req.body;

        const success = await recommendationService.newOne(name, youtubeLink);

        if(!success){
            return res.sendStatus(501);
        }
        res.send(success);
    } catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}

export async function vote(req: Request, res: Response){
    try {
        
        const songId = parseInt(req.params.id);

        if(!songId){
            return res.sendStatus(400);
        }

        const success = await recommendationService.vote(songId, req.path);

        if(!success){
            return res.sendStatus(400);
        } 

        res.send(success);
    } catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}

export async function getRandom(req: Request, res: Response){
    try {
        
        const randomSongs = await recommendationService.getRandom();

        if(!randomSongs){
            return res.sendStatus(404);
        }

        res.send(randomSongs);
    } catch(err) {
        console.log(err);
        res.sendStatus(500)
    }
}

export async function getTop(req: Request, res: Response){
    try {
        
        const amount = parseInt(req.params.amount);

        if(!amount){
            return res.sendStatus(400);
        }

        const topSongs = await recommendationService.getLimitedTopSongs(amount);

        res.send(topSongs);
    } catch(err) {
        console.log(err);
        res.sendStatus(500)
    }
}

export async function createWithGenres(req: Request, res: Response){
    try{
        const validationErros = recommendationWithGenresSchema.validate(req.body).error;

        if(validationErros) return res.sendStatus(400);

        const {name, youtubeLink, genresIds} = req.body;

        const success = await recommendationService.newOneWithGenres(name, youtubeLink, genresIds);

        if(!success){
            return res.sendStatus(501);
        }
        res.send(success);
    } catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}