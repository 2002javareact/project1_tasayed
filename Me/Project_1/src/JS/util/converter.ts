import { Role } from "../models/Role";
import { User } from "../models/User";
import { UserDTO } from "../dto/user-dto";
import { Reimbursement } from "../models/reimbursement";
import {ReimbursementTypes} from "../models/reimbursement-type";
import {ReimbursementStatus} from "../models/reimbusement-status";
import {reimburseDTO} from "../dto/reimburse-dto";
let i:ReimbursementTypes;
let x:ReimbursementStatus;
export function userDTOToUserConverter(userDTO:UserDTO):User{
    let ret = new User(
        userDTO.username,
        userDTO.password,
        userDTO.email,
        userDTO.user_id,
        userDTO.first_name,
        userDTO.last_name,
        new Role(
            userDTO.role_id,
            userDTO.role_name
        )
    )
    return ret
}

export function userToUserDTOConverter(user:User):UserDTO{
    let ret = new UserDTO(
    user.username,
    user.password,
    user.emailAddress,
    user.user_id,
    user.firstName,
    user.lastname,
    user.role.role,
    user.role.roleId
    )
    return ret    
}


export function reimburseDTOToReimburseConverter(reimburseDTO:reimburseDTO):Reimbursement{
    let ret = new Reimbursement(
        reimburseDTO.reimbursementid,
        reimburseDTO.author,
        reimburseDTO.amount,
        reimburseDTO.datesubmitted,
        reimburseDTO.dateresolved,
        reimburseDTO.description,
        reimburseDTO.resolver,
        new ReimbursementStatus(
            reimburseDTO.status_id,
            reimburseDTO.status
        ),
        new ReimbursementTypes(
            reimburseDTO.type_id,
            reimburseDTO.reimbursetype
        )
    )
    return ret
}