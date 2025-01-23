import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const validateToken = (req: Request, res: Response, next: NextFunction) => {
    const headersToken = req.headers['authorization']
    console.log(headersToken);

    if(headersToken != undefined){

        const token = headersToken.slice(7)
        jwt.verify(token, process.env.SECRET_KEY || 'JuanmaSoft')
        next()
    }else{
        res.status(401).json({msg: 'Acceso denied'})
    }
    
}

export default validateToken;