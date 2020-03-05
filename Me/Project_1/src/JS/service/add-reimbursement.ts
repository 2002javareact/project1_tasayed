import { daoAddReimbursement } from "../repository/dao-reimburse-interaction";
import { Reimbursement } from "../models/reimbursement";


export async function addReimbursement(reimburse:Reimbursement):Promise<Reimbursement>{
    return await daoAddReimbursement(reimburse)
}