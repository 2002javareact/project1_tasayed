import { Role } from "./Role"


export class User{
    username:string
    password:string
    emailAddress:string
    user_id:number
    firstName:string
    lastname:string
    role:Role

    constructor(username:string, password:string, emailAddress:string, user_id:number, firstName:string, lastname:string, role:Role){
            
        this.username=username,
        this.password=password,
        this.emailAddress= emailAddress,
        this.user_id = user_id,
        this.firstName= firstName,
        this.lastname= lastname,
        this.role=role
    }
}