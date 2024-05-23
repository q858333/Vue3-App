
import type { ResponseData } from "@/api/base/type";
import type { RolePermissionModel } from "../role/type";


export interface PermissionListResponseData extends ResponseData {
    data : RolePermissionModel[],

}