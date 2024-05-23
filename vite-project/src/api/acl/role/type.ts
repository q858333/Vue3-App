

import type { ResponseData } from "@/api/base/type";
import type { AclRoleModel } from "../user/type";

export interface RoleListResponseData extends ResponseData {
    data : {
        records:AclRoleModel[]
        total:number
    }

}



export interface RolePermissionResponseData extends ResponseData {
    data : RolePermissionModel[],

}

export interface RolePermissionModel {
    id?:number
    name:string
    level?:number
    children?:RolePermissionModel[]
    select?:boolean
    code:string
    pid?:number
}