import { Request, Response } from "express"
import { appDataSource } from "../dataSource"
import { User } from "../entity/user"
import { secretToken, jwt, bcrypt } from "../config"

export class AuthController {

    private userRepository = appDataSource.getRepository(User);

    async login (req: Request, res: Response) {
        try{
            const user = await this.userRepository.findOneBy({
                email: req.body.email
            })
    
            if (await bcrypt.compare(req.body.password, user.password)) {
                const accessToken = jwt.sign(JSON.stringify(user), secretToken)
                res.json({accessToken: accessToken})
            } else {
                res.status(403).send("Error with email or password")
            }
            
        } catch (err) {
            res.status(400).send("Error missing data")
        }
    }

}