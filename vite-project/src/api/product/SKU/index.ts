import request from '@/utils/request'
import type {AllSKUListResponseData,SKUDetailResponseData} from './type'

enum API {
   SKU_LIST = '/admin/product/list/',
   SALE_SKU = '/admin/product/onSale/',
   CANCEL_SALE_SKU = '/admin/product/cancelSale/',
   SKU_DETAIL = '/admin/product/getSkuInfo/',

}

//获取sku列表
export const reqSKUList = (page: number, pageSize: number) => request.get<any, AllSKUListResponseData>(API.SKU_LIST + `${page}/${pageSize}`);
//修改sku上下架状态
export const reqChangeSKUSaleStatus = (skuId: number, isSale: number) => {
    //上架
    if(isSale == 1) {
        return request.get<any, any>(API.SALE_SKU+skuId);
    }
    //下架
    return request.get<any, any>(API.CANCEL_SALE_SKU+skuId);
};
//获取sku详情
export const reqSKUDetail = (skuId: number) => request.get<any, SKUDetailResponseData>(API.SKU_DETAIL+skuId);
