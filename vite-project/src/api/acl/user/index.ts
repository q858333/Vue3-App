
import request from '@/utils/request'
import type { AclUserListResponseData,AclUserModel } from './type';

enum API {
    ACL_USER_LIST = '/admin/acl/user/',
    ADD_USER = '/admin/acl/user/save',
    UPDATE_USER = '/admin/acl/user/update',
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