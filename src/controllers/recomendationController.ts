import { Request, Response } from "express";
import * as recommendationService from "../services/recommendationService";
import { recommendationSchema } from "../schemas/recommendationSchema";

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