import { Request, Response, NextFunction } from "express"
import { secretToken, jwt } from "../config"

/**
 * Authenticates if the user has a Json Web Token and then validates and allows them to continue with their request if it is valid
 * @param req request made by the user
 * @param res response from the request
 * @param next function that allows the user to continue with their request
 * @returns void
 */
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    
    if(token == null) {
        return res.sendStatus(401)
    }
    
    jwt.verify(token, secretToken, (err, user) => {
        if (err) {
            return res.sendStatus(403)
        }

        req.user = user
        next()
    })
}

// Function that allows a request to continue when there's no need for authentication of a JWT
export const pass = (req: Request, res: Response, next: NextFunction) => { next() } 