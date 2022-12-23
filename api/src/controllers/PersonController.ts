import { Request, Response } from "express"
import { appDataSource } from "../dataSource"
import { Person } from "../entity/person"

export class PersonController {

    private personRepository = appDataSource.getRepository(Person);

    async addPerson (req: Request, res: Response) {
        const person = await this.personRepository.create(req.body)
        const results = await this.personRepository.save(person);
        res.send(results)
    }

    async updatePerson (req: Request, res: Response) {
        const person = await this.personRepository.findOneBy({
            id: req.params.id,
        })
        this.personRepository.merge(person, req.body);
        const result = await this.personRepository.save(person);
        res.send(result)
    }
    
    async deletePerson (req: Request, res: Response) {
        const result = await this.personRepository.delete(req.params.id)

        result.affected > 0 ? res.send({ message: "Person deleted" }) : res.status(404).send({ message: "Person not found" }) 
    }
}