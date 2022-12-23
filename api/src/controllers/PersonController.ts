import { Request, Response } from "express"
import { appDataSource } from "../dataSource"
import { Person } from "../entity/person"

export class PersonController {

    private personRepository = appDataSource.getRepository(Person);

    /**
     * Function that adds a person to the database
     * @param req request from the user that has a person's data on its body
     * @param res http response based on the result of the request
     */
    async addPerson (req: Request, res: Response) {
        const person = await this.personRepository.create(req.body)
        const results = await this.personRepository.save(person);
        res.send(results)
    }

    /**
     * Function that looks for a person's data in the database and updates it
     * @param req request from the user that has an id to look for the person and new information to update it
     * @param res http response based on the result of the request
     */
    async updatePerson (req: Request, res: Response) {
        const person = await this.personRepository.findOneBy({
            id: req.params.id,
        })
        this.personRepository.merge(person, req.body);
        const result = await this.personRepository.save(person);
        res.send(result)
    }
    
    /**
     * Function that deletes a person from the database
     * @param req request from the user that contains an id to look for the person to delete
     * @param res http response based on the result of the request
     */
    async deletePerson (req: Request, res: Response) {
        const result = await this.personRepository.delete(req.params.id)
        result.affected > 0 ? res.send({ message: "Person deleted" }) : res.status(404).send({ message: "Person not found" }) 
    }
}