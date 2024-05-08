
import request from '@/utils/request'
import {SPUListResponseData} from './type'

enum API {
    SPU_LIST = '/admin/product/',

}

export const reqSPUList = (page: number,pageSize:number,c3ID:number|string) => request.get<any, SPUListResponseData>(API.SPU_LIST+`/${page}/${pageSize}?category3Id=${c3ID}`);