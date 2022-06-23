import { Request, Response } from "express";

export class userController {
    public getUser(req: Request, res: Response) {
        res.status(200).json({
            user: "Leonel"
        })
    }
}