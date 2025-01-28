import { NextFunction,Response,Request } from "express"



export type ApiType={
    method:'GET'|'POST'|'PUT'|'DEL',
    name:string,
    endpoint:string,
    controller:(req: Request, res: Response)=>Promise<void> | void,
    middleware?:(req: Request, res: Response, next: NextFunction)=>Promise<void>
}

export interface MiddlewareRequest extends Request {
    u?:{
        payload: any,
        error:any,
        body: any
    }
}


export type ApiListType=ApiType[]

export enum serverType{
    Develop="Develop",
    Production="Production"
}

export type ServerConfig={
    SERVER_PORT:number;
    WS_PORT?:number;
    SERVER_TYPE:serverType,
    PUBLİC_FOLDER_NAME:string,
    PREFIX:string
}
