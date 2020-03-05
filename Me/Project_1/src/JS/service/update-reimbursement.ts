import { daoUpdateReimbursement } from "../repository/dao-reimburse-interaction";
import { Reimbursement } from "../models/reimbursement";

export async function updateReimbursement(reimburse:Reimbursement):Promise<Reimbursement>{    
    return await daoUpdateReimbursement(reimburse)
}