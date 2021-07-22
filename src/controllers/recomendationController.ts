import { Request, Response } from "express";
import * as recommendationService from "../services/recommendationService";
import * as recommendationRepository from "../repositories/recommendationRepository";
import { recommendationSchema } from "../schemas/recommendationSchema";

export async function create(req: Request, res: Response){
    try{
        const validationErros = recommendationSchema.validate(req.body).error;

        if(validationErros) return res.sendStatus(400);

        const {name, youtubeLink} = req.body;

        const sucess = recommendationService.newOne(name, youtubeLink);
        if(!sucess){
            return res.sendStatus(501);
        }
        res.sendStatus(201);
    } catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}

export async function upvote(req: Request, res: Response){
    try {
        
        const songId = parseInt(req.params.id);

        if(!songId){
            return res.sendStatus(400);
        }

        recommendationRepository.upvote(songId);

        res.sendStatus(200);
    } catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}