import { daoUpdateUser } from "../repository/dao-user-interaction";
import { User } from "../models/User";

export async function updateUser(user:User):Promise<User>{    
    return await daoUpdateUser(user)
}