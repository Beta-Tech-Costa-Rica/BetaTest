import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from "typeorm"
import { bcrypt } from "../config"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length: 25,
        unique: true
    })
    email: string

    @Column({
        length: 100
    })
    password: string

    @BeforeInsert()
    @BeforeUpdate()
    /**
     * This method hashes the user's password before inserting/updating into the database
     */
    async hashPassword() {
        const hashedPassword = await bcrypt.hash(this.password, 10)
        this.password = hashedPassword
    }

}