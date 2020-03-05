import { PoolClient, Pool } from "pg";
import { connectionPool } from "./index";
import { Reimbursement } from "../models/reimbursement";
import { ReimbursementTypes } from "../models/reimbursement-type";
import { ReimbursementStatus } from "../models/reimbusement-status";
import { userDTOToUserConverter, reimburseDTOToReimburseConverter } from "../util/converter";
import {BadCredentialsError} from '../errors/bad-credentials-error';
import {InternalServerError} from '../errors/internal-server';
import {UserNotFoundError} from '../errors/user-not-found';
import {Moment} from 'moment';
import { reimburseRouter } from "../routers/reimburse-router";
import { findReimburseByUser } from "../service/find-reimburse";
import e = require("express");

let moment = require('moment')
/**
 * @param  {number} statusId
 */
export async function daoFindReimburseByStatus(statusId:number):Promise<Reimbursement[]>{
    let client:any;
    let i:Reimbursement
 
    try {
        client = await connectionPool.connect()
        let results = await client.query('SELECT * FROM Proj0.reimbursement R  inner join Proj0.reimbursementStatus S on S.status_id = R.status inner join Proj0.reimbursementType T on R."type" = T.type_id where s.status_id = $1 order by R.datesubmitted;', [statusId])
        if(results.rowCount === 0){
            throw new Error('Reimbursement Not Found')
        }
        let ret:Reimbursement[] = [];
        for(let i =0; i<results.rowCount; i++ ){
            ret.push(reimburseDTOToReimburseConverter(results.rows[i]))         

        }
        
        
        return ret
    } catch(e){       
        
        console.log(e);
        if(e.message === 'Reimbursement Not Found'){
            throw new BadCredentialsError()
        }else {
            throw new InternalServerError()
        }
    } finally {
        client && client.release()
    }
}
/**
 * @param  {number} userId
 */
export async function daoFindReimburseByUser(userId:number):Promise<Reimbursement[]>{
    let client:any;
    let i:Reimbursement
    try {
        client = await connectionPool.connect()
        let results = await client.query('SELECT * FROM Proj0.reimbursement R  inner join Proj0.reimbursementStatus S on S.status_id = R.status inner join Proj0.reimbursementType T on R."type" = T.type_id where R.author = $1 order by R.datesubmitted;', [userId])
        if(results.rowCount === 0){
            throw new Error('Reimbursement Not Found')
        }
        let ret:Reimbursement[] = [];
        for(let i =0; i<results.rowCount; i++ ){
            ret.push(reimburseDTOToReimburseConverter(results.rows[i]))         

        }
        
        
        return ret
    } catch(e){       
        
        console.log(e);
        if(e.message === 'Reimbursement Not Found'){
            throw new BadCredentialsError()
        }else {
            throw new InternalServerError()
        }
    } finally {
        client && client.release()
    }
}
/**
 * @param  {Reimbursement} reimburse
 */
export async function daoAddReimbursement(reimburse:Reimbursement):Promise<Reimbursement>{
    let client:any;
    try {
    let resolve = new Date(reimburse.dateResolved)
    client = await connectionPool.connect()
    let results = await client.query('insert into Proj0.reimbursement (author, amount, dateSubmitted, dateResolved, description, status, resolver, "type") values ($1, $2, $3, $4, $5, $6, $7, $8);', [reimburse.author, reimburse.amount, reimburse.dateSubmitted, reimburse.dateResolved, reimburse.description, reimburse.reimbursementStatus.statusId, reimburse.resolver,reimburse.reimbursementType.typeId]);
    return await reimburse;

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
 * @param  {Reimbursement} reimburse
 */
export async function daoUpdateReimbursement(reimburse:Reimbursement):Promise<Reimbursement>{
    let client:any;
    try {
        
    client = await connectionPool.connect()
    let results = await client.query('UPDATE Proj0.reimbursement SET amount  = $2, dateSubmitted = $3, dateResolved =$4,  description  = $5,  status  = $6,  resolver = $7, "type" = $8 WHERE reimbursementid = $1;',[reimburse.reimbursementId,reimburse.amount,reimburse.dateSubmitted,reimburse.dateResolved,reimburse.description, reimburse.reimbursementStatus.statusId, reimburse.resolver,reimburse.reimbursementType.typeId]);
    results = await daoFindReimburseByID(reimburse.reimbursementId)
    if(results.rowCount === 0){
        throw new Error('User Not Found')
    }
    return results
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
 * @param  {number} reimburseId
 */
export async function daoFindReimburseByID(reimburseId:number):Promise<Reimbursement>{
    let client:any;
    let i:Reimbursement
    try {
        client = await connectionPool.connect()
        let results = await client.query('SELECT * FROM Proj0.reimbursement R  inner join Proj0.reimbursementStatus S on S.status_id = R.status inner join Proj0.reimbursementType T on R."type" = T.type_id where R.reimbursementid = $1;', [reimburseId])
        if(results.rowCount === 0){
            throw new Error('Reimbursement Not Found')
        }
        
        let ret:Reimbursement =reimburseDTOToReimburseConverter(results.rows[0])   
        
         
        
        
        return ret
    } catch(e){       
        
        console.log(e);
        if(e.message === 'Reimbursement Not Found'){
            throw new BadCredentialsError()
        }else {
            throw new InternalServerError()
        }
    } finally {
        client && client.release()
    }
}