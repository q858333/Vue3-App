import request from '@/utils/request'
import type {AllSKUListResponseData} from './type'

enum API {
   SKU_LIST = '/admin/product/list/',
}


export const reqSKUList = (page: number, pageSize: number) => request.get<any, AllSKUListResponseData>(API.SKU_LIST + `${page}/${pageSize}`);