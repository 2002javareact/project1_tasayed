import * as express from 'express'
import { authFactory, authCheckId } from '../middleware/auth-middleware'
import { findUserByUserID, findAllUsers } from '../service/find-user';
import { User } from '../models/User';
import { sessionMiddleware } from '../middleware/session-middleware';
import * as bodyparser from 'body-parser'
import { Role } from '../models/Role';
import { addUser } from '../service/add-user';
import { updateUser } from '../service/update-user';

//all app.get to userRouter use ctrl d to go  through the changes.

// starts router
export const userRouter = express.Router()
userRouter.use("/", bodyparser.json())
userRouter.use(sessionMiddleware)


let adminAuth:string[] = ["admin"];
let financeAuth:string[] = ["admin", "finance_manager"];
let allAuth:string[] = ["admin", "finance_manager", "user"];

userRouter.post('/users/add', authFactory(adminAuth), authCheckId, async (req,res)=>{    
    let {username, password, email, user_id, first_name, last_name, role} = req.body
        try{
            if( username && password && email && user_id && first_name&& last_name && role.role&& role.role_id){
           let user:User = new User(
                username,
                password,
                email,
                user_id,
                first_name,
                last_name,
                new Role(
                    role.role_id,
                    role.role
                )
           )
           user = await addUser(user)
            res.status(200).json(await user)
                }else{
                    res.status(400).send("Enter a user");     
                }
        }catch(e){
            res.status(e.status)
        }
})


userRouter.patch('/users/update/:id', authFactory(adminAuth), authCheckId, async (req,res)=>{  
        try{
            let id = +req.params.id; 
            let {username, password, email, first_name, last_name, role} = req.body
            if(id){
                let pulledUser = findUserByUserID(id)
                let user:User = new User(
                username || (await pulledUser).username,
                password|| (await pulledUser).password,
                email || (await pulledUser).emailAddress,
                id ,
                first_name || (await pulledUser).firstName,
                last_name || (await pulledUser).lastname,
                new Role(
                    role.role_id || (await pulledUser).role.roleId,
                    role.role || (await pulledUser).role.role
                )
           )
            user = await updateUser(user)
            res.status(200).json(await user)
                }else{
                    res.status(400).send("Enter a user");     
                }
        }catch(e){
            res.status(e.status)
        }
        
})

/**
 * @param "url header" with :id ->userid
 * @param req
 * @param res
 * @returns user (or error)
 */
userRouter.get('/users/:id', authFactory(financeAuth), authCheckId, async (req,res)=>{
    let id = +req.params.id;
    let user:User;
    if(!id && isNaN(id)){
        res.status(400).send("Please enter id value")
    }
    try{
        
        user = await findUserByUserID(id)
        req.session.user = await user
        res.status(200).json(await user)
    }catch(e){
        res.status(e.status)
    }
})
/**
 * @param 
 */
// userRouter.get("/users", authFactory(financeAuth), authCheckId, (req, res)=>{
//     if(req.session.user.role){
//         if(req.session.user.role.roleId<=2){
//             res.send(req.session.user)
//         //  res.status(200).json(User)
//         }else{
//             res.status(400).send("Invalid Credentials")
//         }
//     }else{
//         res.send("Invalid Credentials")
//     }
// })

userRouter.get("/users", authFactory(financeAuth), authCheckId, async (req, res)=>{
    res.json(await findAllUsers());
})

