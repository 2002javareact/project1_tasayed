import * as express from 'express'
import * as bodyparser from 'body-parser'
import { User } from './models/User'
import { userRouter } from './routers/user-router'
import {sessionMiddleware} from "./middleware/session-middleware"
import { HttpError } from './errors/HTTP-Error'
import {Users} from './database'
import { findUserByUsernameAndPassword, findUserByUserID } from './service/find-user'
import { authFactory, authCheckId } from './middleware/auth-middleware'
import { reimburseRouter } from './routers/reimburse-router'

//import {loggingMiddleware} from './middleware/logging-middleware'
//call express func return obj into app
const app = express()



/**
 * CheckList: X = Done, O = TBD,  Y = In Progress
 * ----------------------------------------------
 * Login X - Add db next
 * Find Users Y - Finance manager
 * Make DB X
 * Attach DB X 
 * Find Users By ID X - Finance Manager
 * Update User X - Admin
 * 
 * Find Reimbursements By Status X - Finance Manager
 * Find Reimbursements By User X - Finance Manager
 * Submit Reimbursement X - User
 * Update Reimbursement X - Finance Manager (Added FindReimbursement by ID)
 * 
 * 
 * Potential Next Steps:
 * -----------------------------------------------
 * User can change only password
 * Finance manager cannot see passwords/sensitive data
 * Clean SQL imports
 * Admins cannot see each others passwords
 * Password Hash
 */


/**
 * starts on port
 */
app.listen(2002, ()=>{
    console.log('app has started on port 2002');
    
})
/**
 * ------------MIDDLEWARE----------------
 */
app.use(sessionMiddleware)
// app.use(loggingMiddleware)


/** reads the page for us */
app.use("/", bodyparser.json())

//routers
app.use(userRouter)
app.use(reimburseRouter)

/**
 * looks for login and takes 
 * @param username
 * @param password
 * then uses @function findUserByUsernameAndPassword
 * and 
 * @returns user
 */
app.post("/login", async (req, res)=>{
    let {username, password} = req.body
    if(!username && !password){
        res.status(400).send("Please enter username and password")
    }
    try{
        let user:User = await findUserByUsernameAndPassword(username, password)
        req.session.user = await user
        res.status(200).json(await user)
    }catch(e){
        res.status(e.status)
    }
})



