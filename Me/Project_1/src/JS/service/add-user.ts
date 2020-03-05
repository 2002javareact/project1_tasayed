import { daoAddUser } from "../repository/dao-user-interaction";
import { User } from "../models/User";

export async function addUser(user:User):Promise<User>{    
    return await daoAddUser(user)
}