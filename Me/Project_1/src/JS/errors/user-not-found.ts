import { HttpError } from "./http-error";


export class UserNotFoundError extends HttpError {
    constructor(){
        super('User Not Found', 404)
    }
}