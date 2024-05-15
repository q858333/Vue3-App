
import request from '@/utils/request'
import type { AclUserListResponseData } from './type';

enum API {
    ACL_USER_LIST = '/admin/acl/user/',
}

export const reqAclUserList = (page: number, limit: number) => request.get<any, AclUserListResponseData>(API.ACL_USER_LIST+`${page}/${limit}`);