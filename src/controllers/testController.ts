import { Request, Response } from "express";

export function testing(req: Request, res: Response){
    res.send("OK!");
}