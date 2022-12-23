import { appDataSource } from "./dataSource"
import { Routes } from "./routes"
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { port } from "./config"
import * as express from "express"
import * as cors from "cors"

const app = express()
app.use(express.json())
app.use(cors())

// Initialize the connection with the database
appDataSource.initialize()
    .then(() => {
    // Listen through the designated port for any valid requests
    app.listen(port, () => {
        console.log(`Server running at port ${port}....`)
    })

    //Using a loop we can access each route available, their validations and properties in our file of routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route,
          ...route.validation, route.auth,
          async (req: Request, res: Response, next: Function) => {
            try {
                //If there's errors with the validations in a route it returns an error message, otherwise it continues with the user's request
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).send("Error missing data");
                }
        
                const result = await (new (route.controller as any))[route.action](req, res);
                res.json(result);
            } catch(err) {
                next(err.message);
            }
        });
      });
}).catch((err) => {
    console.log(err)
})