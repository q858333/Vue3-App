
import request from '@/utils/request'
import type { PermissionListResponseData } from './type';

enum API {
    PERMISSION_LIST = '/admin/acl/permission',
}

export const reqPermissionList = ()=>request.get<any,PermissionListResponseData>(API.PERMISSION_LIST);
