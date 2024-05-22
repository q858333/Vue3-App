
import request from '@/utils/request'
import { RoleListResponseData,RolePermissionResponseData} from './type';
import { AclRoleModel } from '../user/type';

enum API {
    ROLE_LIST = '/admin/acl/role/',
    ADD_ROLE = '/admin/acl/role/save',
    UPDATE_ROLE = '/admin/acl/role/update',
    ROLE_PERMISSION = '/admin/acl/permission/toAssign/',
    ROLE_SET_PERMISSION = '/admin/acl/permission/doAssign',

}
//获取职位列表
export const reqRoleList = (page:number,pageSize:number,roleName:string)=>request.get<any,RoleListResponseData>(API.ROLE_LIST+`${page}/${pageSize}?roleName=${roleName}`);
//添加/更新职位
export const reqAddOrUpdateRole = (data:AclRoleModel)=>{
    if(data.id) {
        return request.put<any,any>(API.UPDATE_ROLE,data);
    }
    return request.post<any,any>(API.ADD_ROLE,data);
}
//获取角色权限
export const reqRolePermission = (roleId:number)=>request.get<any,RolePermissionResponseData>(API.ROLE_PERMISSION+roleId);
//给角色分配权限
export const reqSetPermission = (roleId:number,permissionId:number[])=>request.post<any,any>(API.ROLE_SET_PERMISSION+`?roleId=${roleId}&permissionId=${permissionId}`);