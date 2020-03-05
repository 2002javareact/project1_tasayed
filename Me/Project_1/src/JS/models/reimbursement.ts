import { ReimbursementStatus } from "./reimbusement-status"
import { ReimbursementTypes } from "./reimbursement-type"

export class Reimbursement{
    reimbursementId: number
	author: number
	amount: number
    dateSubmitted: Date
    dateResolved: Date
    description: string
    resolver: number
    reimbursementStatus:ReimbursementStatus
    reimbursementType:ReimbursementTypes
    constructor(reimbursementId: number, author: number, amount: number, dateSubmitted: Date, 
        dateResolved: Date, description: string, resolver: number, reimbursementStatus: ReimbursementStatus, reimbursementType:ReimbursementTypes ){
        this.reimbursementId = reimbursementId
	    this.author = author
	    this.amount = amount
        this.dateSubmitted = dateSubmitted
        this.dateResolved = dateResolved
        this.description = description
        this.resolver = resolver
        this.reimbursementStatus = reimbursementStatus
        this.reimbursementType = reimbursementType
        
    }
}