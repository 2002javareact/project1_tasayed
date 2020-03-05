export class UserDTO {
    username:string
    password:string
    email:string
    user_id:number
    first_name:string
    last_name:string
    role_name:string 
    role_id:number
    constructor(username:string,
        password:string,
        email:string,
        user_id:number,
        first_name:string,
        last_name:string,
        role_name:string,
        role_id:number){
            this.username = username
            this.password = password
            this.email = email
            this.user_id = user_id
            this.first_name = first_name
            this.last_name = last_name
            this.role_name = role_name
            this.role_id = role_id            
        }
}