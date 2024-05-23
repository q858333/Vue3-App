
import request from '@/utils/request'
import type { PermissionListResponseData } from './type';
import { RolePermissionModel } from '../role/type';

enum API {
    PERMISSION_LIST = '/admin/acl/permission',
    ADD_PERMISSION = '/admin/acl/permission/save',
    UPDATE_PERMISSION = '/admin/acl/permission/update',
    DELETE_PERMISSION = '/admin/acl/permission/remove/',
}

//获取权限列表
export const reqPermissionList = ()=>request.get<any,PermissionListResponseData>(API.PERMISSION_LIST);
//更新或添加权限
export const reqAddOrUpdatePermission = (data:RolePermissionModel)=>{
    if(data.id) {
        return request.put<any,any>(API.UPDATE_PERMISSION,data);
    }
    return request.post<any,any>(API.ADD_PERMISSION,data);
}
//删除权限
export const reqDeletePermission = (id:number)=>request.delete<any,any>(API.DELETE_PERMISSION+id);