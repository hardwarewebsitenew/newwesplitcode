import { validationResult } from "express-validator";
import * as jwt from "jsonwebtoken";
import userModels from "../Models/userModels";

export class globalcheckerror{
    static checkerror(req, res, next)
    {
        const errdel = validationResult(req)

        if(!errdel.isEmpty())
        {
            console.log(errdel.array()[0].msg)
            next(new Error(errdel.array()[0].msg))
            
        }
        else
        {
            next();
        }

    }

   

    static authenticate(req, res, next)
    {
        const authkey = req.headers.authorization;
        const token = authkey ? authkey.slice(7, authkey.length): null;

        try {
            jwt.verify(token,'secret', (eerr, decoded)=> {
                if(eerr)
                {
                    next(eerr)
                }
                else if (!decoded){
                    next(new Error('User Not Authorised'))
                }
                else
                {
                    req.user = decoded;
                    next();
                }

            })
            

        } catch (error) {
            
        }
    }
}