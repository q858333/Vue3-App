
import request from '@/utils/request'
import type {CategoryResponseData} from './type'

enum API{
    CATEGORY1 = '/admin/product/getCategory1',
    CATEGORY2 = '/admin/product/getCategory2/',
    CATEGORY3 = '/admin/product/getCategory3/',
}

export const reqC1 = ()=> request.get<any, CategoryResponseData>(API.CATEGORY1);
export const reqC2 = (c1:number)=> request.get<any, CategoryResponseData>(API.CATEGORY2+c1);
export const reqC3 = (c2:number)=> request.get<any, CategoryResponseData>(API.CATEGORY3+c2);