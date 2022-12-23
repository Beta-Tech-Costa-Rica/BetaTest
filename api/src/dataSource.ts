import "reflect-metadata"
import { DataSource } from "typeorm"
import { Person } from "./entity/person"
import { User } from "./entity/user"

// Data needed to connect with the database
export const appDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "esalas",
    password: "0ewj0Ra6zYWe",
    database: "postgres",
    synchronize: true,
    logging: false,
    entities: [Person, User],
    migrations: [],
    subscribers: [],
})
