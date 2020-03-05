import { User } from "./models/User";
import { Role } from "./models/Role";


export let Users:User[] = [
    new User("ahmed_hash", 'password', 'some_email@gmail.com', 1, 'ahmed', 'singh', new Role(3, 'user')),
    new User("greg_SE", 'nty', 'someotheremail@gmail.com',2, 'greg','zack', new Role(1, 'admin')),
    new User("avery_user", 'flinstones', 'carwithwheels@gmail.comnpm',3, 'fred', 'smith', new Role(1, 'admin'))
]
