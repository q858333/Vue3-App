
import request from '@/utils/request'
import type { AclUserListResponseData,AclUserModel,AclUserRoleListResponseData,SetRoleForm } from './type';

enum API {
    ACL_USER_LIST = '/admin/acl/user/',
    ADD_USER = '/admin/acl/user/save',
    UPDATE_USER = '/admin/acl/user/update',
    USER_ROLE_LIST = '/admin/acl/user/toAssign/',
    SET_USER_ROLE = '/admin/acl/user/doAssignRole',
    DELETE_USER = '/admin/acl/user/batchRemove',
}

//获取用户列表
export const reqAclUserList = (page: number, limit: number) => request.get<any, AclUserListResponseData>(API.ACL_USER_LIST+`${page}/${limit}`);
//添加或更新用户
export const reqAddOrUpdateUser = (data: AclUserModel) => {
    if(data.id) {
        return request.put<any, any>(API.UPDATE_USER, data)
    } else {
        return request.post<any, any>(API.ADD_USER, data)
    }
}
//获取用户角色
export const reqUserRoleList = (userId:number) => request.get<any,AclUserRoleListResponseData>(API.USER_ROLE_LIST+userId);
//设置用户角色
export const reqSetUserRole = (data:SetRoleForm)=>request.post<any,any>(API.SET_USER_ROLE,data);
//删除用户
export const reqDeleteUser = (idList:number[])=>request.delete<any,any>(API.DELETE_USER,{data:idList});