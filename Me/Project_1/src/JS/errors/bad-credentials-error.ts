import { HttpError } from "./http-error";


export class BadCredentialsError extends HttpError{
    constructor(){
        super('Invalid Credentials', 400)
    }
}