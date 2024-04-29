
import request from '@/utils/request'
import type {CategoryResponseData,AttrListResponseData} from './type'

enum API{
    CATEGORY1 = '/admin/product/getCategory1',
    CATEGORY2 = '/admin/product/getCategory2/',
    CATEGORY3 = '/admin/product/getCategory3/',
    ATTR_LIST = '/admin/product/attrInfoList/',
}

export const reqC1 = ()=> request.get<any, CategoryResponseData>(API.CATEGORY1);
export const reqC2 = (c1:number|string)=> request.get<any, CategoryResponseData>(API.CATEGORY2+c1);
export const reqC3 = (c2:number|string)=> request.get<any, CategoryResponseData>(API.CATEGORY3+c2);
export const reqAttrList = (category1Id:number|string, category2Id:number|string, category3Id:number|string)=> request.get<any, AttrListResponseData>(API.ATTR_LIST+`${category1Id}/${category2Id}/${category3Id}`);