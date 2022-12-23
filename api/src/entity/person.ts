import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Person {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length: 25
    })
    firstName: string

    @Column({
        length: 25
    })
    lastName: string

    @Column()
    age: number

}
