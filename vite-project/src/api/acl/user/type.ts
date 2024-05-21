import { ResponseData } from "@/api/base/type";


export interface AclUserModel {
    id?: number
    createTime?: string
    updateTime?: string
    username: string
    password: string
    name: string
    phone?: string
    roleName?: string
}

export interface AclUserListResponseData extends ResponseData {
    data : {
        records:AclUserModel[]
        total:number
    }

}



export interface AclRoleModel {
    id?: number
    roleName: string
    remark?: string
    createTime?:string
    updateTime?:string
}


export interface AclUserRoleListResponseData extends ResponseData {
    data : {
        //用户role
        assignRoles:AclRoleModel[]
        //所有role
        allRolesList:AclRoleModel[]
    }

}


export interface SetRoleForm {
    userId:number
    roleIdList:number[]
}