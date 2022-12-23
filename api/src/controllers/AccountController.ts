import { Request, Response } from "express"
import { appDataSource } from "../dataSource"
import { User } from "../entity/user"
import { secretToken, jwt, bcrypt } from "../config"

export class AccountController {

    private userRepository = appDataSource.getRepository(User);

    /**
     * Function that tries to log in a user using email and password.
     * If the user data is correct it returns a Json web token that the user can use to make requests from endpoints that need authentication
     * @param req request that has the user email and password on its body 
     * @param res http response that has a JWT on sucessful log in
     */
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
            res.status(403).send("Error with email or password")
        }
    }

    async signup (req: Request, res: Response) {
        try{
            const user = await this.userRepository.create(req.body)
            await this.userRepository.save(user);
            res.status(200).send("User registered successfully")
        } catch (err) {
            res.status(403).send("Error email is already registered")
        }
    }

}