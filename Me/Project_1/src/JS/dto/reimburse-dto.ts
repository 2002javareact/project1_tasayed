import {Moment} from 'moment';

var moment = require('moment')

export class reimburseDTO {
    reimbursementid:number
    author:number
    amount:number
    datesubmitted:Date
    dateresolved:Date
    description:string
    resolver:number 
    status:string
    reimbursetype:string
    type_id:number
    type:number
    status_id:number
    constructor(
        author:number,
        amount:number,
        datesubmitted:any,
        dateresolved:any,
        description:string,
        status:string,
        resolver:number,
        type:number,
        reimbursementid:number,
        status_id:number,
        type_id:number,
        reimburseType:string
        
        ){
            this.reimbursementid = reimbursementid
            this.author = author
            this.amount = amount
            this.datesubmitted =datesubmitted
            this.dateresolved = dateresolved
            this.description = description
            this.resolver = resolver
            this.status = status
            this.status_id = status_id
            this.type = type
            this.type_id = type_id
            this.reimbursetype=reimburseType        
        }
}

