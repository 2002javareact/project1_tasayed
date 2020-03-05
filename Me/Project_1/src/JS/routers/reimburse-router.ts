import * as express from 'express'
import { authFactory, authCheckId } from '../middleware/auth-middleware'
import { findUserByUserID } from '../service/find-user';
import { User } from '../models/User';
import { sessionMiddleware } from '../middleware/session-middleware';
import * as bodyparser from 'body-parser'
import { Role } from '../models/Role';
import { addUser } from '../service/add-user';
import { Reimbursement } from '../models/reimbursement';
import { findReimburseByStatus, findReimburseByUser, findReimburseByID } from '../service/find-reimburse';
import { addReimbursement } from '../service/add-reimbursement';
import { ReimbursementStatus } from '../models/reimbusement-status';
import { ReimbursementTypes } from '../models/reimbursement-type';
import { daoUpdateReimbursement } from '../repository/dao-reimburse-interaction';
import { updateReimbursement } from '../service/update-reimbursement';
import { userRouter } from './user-router';

//all app.get to userRouter use ctrl d to go  through the changes.

// starts router
export const reimburseRouter = express.Router()
reimburseRouter.use("/", bodyparser.json())
reimburseRouter.use(sessionMiddleware)

let epoch = new Date(0)

let adminAuth: string[] = ["admin"];
let financeAuth: string[] = ["admin", "finance_manager"];
let allAuth: string[] = ["admin", "finance_manager", "user"];


reimburseRouter.get('/reimbursements/status/:status', authFactory(financeAuth), authCheckId, async (req, res) => {
    try {

        let statusId = +req.params.status;

        if (statusId && isNaN(statusId)) {
            res.status(400).send("Please enter status value")
        }

        let reimburse: Reimbursement[] = await findReimburseByStatus(statusId)

        res.status(200).json(await reimburse)


    } catch (e) {
        res.status(e.status)
    }
})



reimburseRouter.get('/reimbursements/author/userId/:userId', authFactory(allAuth), authCheckId, async (req, res) => {
    try {

        let userId = +req.params.userId;

        if (userId && isNaN(userId)) {
            res.status(400).send("Please enter status value")
        }

        let reimburse: Reimbursement[] = await findReimburseByUser(userId)

        res.status(200).json(await reimburse)

    } catch (e) {
        res.status(e.status)
    }
})


//addReimbursement(reimburse:Reimbursement)



reimburseRouter.post('/reimbursements', authFactory(allAuth), authCheckId, async (req, res) => {
    let {/**reimbursementId ,*/ author, amount, dateSubmitted, description, resolver, reimbursementType } = req.body
    if(req.session.user.role && req.session.user.role.role == "user" && author!= req.session.user.userId ){
        res.status(400).send("Enter a reimbursement for yourself.  Role:User");
    }
    try {
        if ( /**reimbursementId &&*/ author && amount && dateSubmitted && description &&reimbursementType.type && reimbursementType.typeId) {
            
            let reimburse: Reimbursement = new Reimbursement(
                //reimbursementId ,
                0,
                author,
                amount,
                new Date(dateSubmitted),
                epoch,
                description,
                null,
                new ReimbursementStatus(
                    1,
                    "Pending"
                ),
                new ReimbursementTypes(
                    reimbursementType.typeId,
                    reimbursementType.type
                )

            )
            reimburse = await addReimbursement(reimburse)
            res.status(200).json(await reimburse)
        } else {
            res.status(400).send("Enter a reimbursement");
        }
    } catch (e) {
        res.status(e.status)
    }
})


reimburseRouter.patch('/reimbursements', authFactory(financeAuth), authCheckId, async (req,res)=>{  
    try{
        let {reimbursementId, author, amount, dateResolved, description,  resolver, reimbursementStatus,reimbursementType } = req.body
        if ( reimbursementId && author && amount  && dateResolved && description && resolver && reimbursementStatus.statusId && reimbursementStatus.status&&reimbursementType.type && reimbursementType.typeId)
            {
            let pulledReimbursement = findReimburseByID(reimbursementId)
            let reimburse:Reimbursement = new Reimbursement(
                reimbursementId,
                author || (await pulledReimbursement).author,
                amount|| (await pulledReimbursement).amount,
                (await pulledReimbursement).dateSubmitted,
                new Date(dateResolved) || (await pulledReimbursement).dateResolved,
                description || (await pulledReimbursement).description ,
                resolver || (await pulledReimbursement).resolver,
                new ReimbursementStatus(
                    reimbursementStatus.statusId || (await pulledReimbursement).reimbursementStatus.statusId,
                    reimbursementStatus.status  || (await pulledReimbursement).reimbursementStatus.status
                ),
                new ReimbursementTypes(
                    reimbursementType.typeId || (await pulledReimbursement).reimbursementType.typeId,
                    reimbursementType.type || (await pulledReimbursement).reimbursementType.type
                )
       )
        reimburse = await updateReimbursement(reimburse)
        res.status(200).json(await reimburse)
            }else{
                res.status(400).send("Enter a reimbursement.");     
            }
    }catch(e){
        res.status(e.status)
    }
})