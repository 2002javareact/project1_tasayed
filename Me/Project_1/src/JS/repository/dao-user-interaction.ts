import { connectionPool } from "./index";
import { User } from "../models/User";
import { userDTOToUserConverter } from "../util/converter";
import {BadCredentialsError} from '../errors/bad-credentials-error';
import {InternalServerError} from '../errors/internal-server';
/**
 * @param  {string} username
 * @param  {string} password
 */
export async function daoFindUserByUsernameAndPassword(username:string, password:string):Promise<User>{
    let client:any;
 
    try {
        client = await connectionPool.connect()
        // a paramaterized query
        let results = await client.query('SELECT * FROM Proj0.users U inner join Proj0.roles R on U."role" = R.role_id  WHERE U.username = $1  and U."password" = $2', [username,password])
        if(results.rowCount === 0){
            throw new Error('User Not Found')
        }
        return userDTOToUserConverter(results.rows[0])
    } catch(e){       
        
        console.log(e);
        if(e.message === 'User Not Found'){
            throw new BadCredentialsError()
        }else {
            throw new InternalServerError()
        }
    } finally {
        client && client.release()
    }
}

/**
 * @param  {number} userID
 */
export async function daoFindUserByUserID(userID:number):Promise<User>{
    let client:any;
    
    try {
        client = await connectionPool.connect()
        
        // a paramaterized query
        let results = await client.query('SELECT * FROM Proj0.users U inner join Proj0.roles R on U."role" = R.role_id  WHERE U.user_id = $1;', [userID])
        
        if(results.rowCount === 0){
            throw new Error('User Not Found')
        }
        return userDTOToUserConverter(results.rows[0])
    } catch(e){       
        
        console.log(e);
        if(e.message === 'User Not Found'){
            throw new BadCredentialsError()
        }else {
            throw new InternalServerError()
        }
    } finally {
        client && client.release()
    }
}

export async function daoFindAllUsers():Promise<User[]>{
    let client:any;
    
    try {
        client = await connectionPool.connect()
        
        // a paramaterized query
        let results = await client.query('SELECT * FROM Proj0.users U inner join Proj0.roles R on U."role" = R.role_id ',)
        
        if(results.rowCount === 0){
            throw new Error('User Not Found')
        }
        let arrUser:User[] = []
        for(let i = 0; i<results.rowCount; i++){
            arrUser.push(userDTOToUserConverter(results.rows[i]))
            
        }
        
        return arrUser
    } catch(e){       
        
        console.log(e);
        if(e.message === 'User Not Found'){
            throw new BadCredentialsError()
        }else {
            throw new InternalServerError()
        }
    } finally {
        client && client.release()
    }
}
/**
 * @param  {User} user
 */
export async function daoAddUser(user:User):Promise<User>{
    let client:any;
    try {
        
    client = await connectionPool.connect()
    let results = await client.query('insert into Proj0.users (username, "password" , email, first_name, last_name, "role") values ($1, $2, $3, $4, $5, $6);',[user.username, user.password, user.emailAddress, user.firstName, user.lastname, user.role.roleId]);
    results = await client.query('SELECT * FROM Proj0.users U inner join Proj0.roles R on U."role" = R.role_id  WHERE U.user_id = $1;', [user.user_id]);
    if(results.rowCount === 0){
        throw new Error('User Not Found')
    }
    return userDTOToUserConverter(results.rows[0])
} catch(e){  
    console.log(e);
        if(e.message === 'User Not Found'){
            throw new BadCredentialsError()
        }else {
            throw new InternalServerError()
        }
    } finally {
        client && client.release()
    }
}

/**
 * @param  {} user
 */
export async function daoUpdateUser(user):Promise<User>{
    let client:any;
    try {
        
    client = await connectionPool.connect()
    let results = await client.query('UPDATE Proj0.users SET username = $1,  "password"  = $2, email = $3, first_name =$4,  last_name  = $5,  "role"  = $6 WHERE user_id = $7;',[user.username, user.password, user.emailAddress, user.firstName, user.lastname, user.role.roleId, user.user_id]);
    results = await client.query('SELECT * FROM Proj0.users U inner join Proj0.roles R on U."role" = R.role_id  WHERE U.user_id = $1;', [user.user_id]);
    if(results.rowCount === 0){
        throw new Error('User Not Found')
    }
    return userDTOToUserConverter(results.rows[0])
} catch(e){  
    console.log(e);
        if(e.message === 'User Not Found'){
            throw new BadCredentialsError()
        }else {
            throw new InternalServerError()
        }
    } finally {
        client && client.release()
    }
}