

import { ResponseData } from "@/api/base/type";
import { AclUserModel } from "../user/type";

export interface RoleListResponseData extends ResponseData {
    data : {
        records:AclUserModel[]
        total:number
    }

}