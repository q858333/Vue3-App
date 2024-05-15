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