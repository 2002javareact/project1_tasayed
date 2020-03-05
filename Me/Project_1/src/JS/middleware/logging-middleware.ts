import {Request, Response} from 'express'
import {NextFunction} from 'express'


export function loggingMiddleware(req:Request, res:Response, next:NextFunction){
    console.log(`Request URL is ${req.url} and Response is ${res}`)
    next()
}