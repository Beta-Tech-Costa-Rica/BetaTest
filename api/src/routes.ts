import { PersonController } from "./controllers/PersonController";
import { AuthController } from "./controllers/AuthController";
import { authenticateToken, pass } from "./middleware/authMiddleware"
import { body, param } from "express-validator";

//List of routes to make requests
export const Routes = [{
    method: "post",
    route: "/person",
    controller: PersonController,
    action: "addPerson",
    auth: authenticateToken,
    validation: [
        body('firstName').isString(),
        body('lastName').isString(),
        body('age').isInt({ min: 0 }).withMessage('Age must be 0 or greater'),
    ],
}, {
    method: "put",
    route: "/person/:id",
    controller: PersonController,
    action: "updatePerson",
    auth: authenticateToken,
    validation: [
        param('id').isInt(),
        body('firstName').isString(),
        body('lastName').isString(),
        body('age').isInt({ min: 0 }).withMessage('Age must be 0 or greater'),
    ],
}, {
    method: "delete",
    route: "/person/:id",
    controller: PersonController,
    action: "deletePerson",
    auth: authenticateToken,
    validation: [
        param('id').isInt(),
    ],
}, {
    method: "post",
    route: "/login",
    controller: AuthController,
    action: "login",
    auth: pass,
    validation: [
        body('email').isEmail(),
        body('password').isString(),
    ],
}]