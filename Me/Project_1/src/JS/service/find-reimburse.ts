import { daoFindReimburseByStatus, daoFindReimburseByUser, daoFindReimburseByID } from "../repository/dao-reimburse-interaction";
import { Reimbursement } from "../models/reimbursement";


export async function findReimburseByStatus(statusId:number):Promise<Reimbursement[]>{
    return await daoFindReimburseByStatus(statusId)
}


export async function findReimburseByUser(userId:number):Promise<Reimbursement[]>{
    return await daoFindReimburseByUser(userId)
}


export async function findReimburseByID(reimburseId:number):Promise<Reimbursement>{
    return await daoFindReimburseByID(reimburseId)
}