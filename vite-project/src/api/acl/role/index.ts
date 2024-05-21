
import request from '@/utils/request'

enum API {
    ROLE_LIST = '/admin/acl/role/'
}

export const reqRoleList = (page:number,pageSize:number,roleName:string)=>request.get<any,RoleListResponseData>(API.ROLE_LIST+`${page}/${pageSize}?roleName=${roleName}`);