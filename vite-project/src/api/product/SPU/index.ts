
import request from '@/utils/request'
import type {SPUListResponseData, AllTradeMarkListResponseData, SPUImageListResponseData, SPUAtteListResponseData,SPUAllAtteListResponseData, SPUModel} from './type'

enum API {
    SPU_LIST = '/admin/product/',
    ALL_TRADEMARK_LIST = '/admin/product/baseTrademark/getTrademarkList',
    SPU_IMAGE_LIST = '/admin/product/spuImageList/',
    SPU_ATTR_LIST = '/admin/product/spuSaleAttrList/',
    SPU_ALL_ATTR_LIST = '/admin/product/baseSaleAttrList/',
    SPU_ADD = '/admin/product/saveSpuInfo',
    SPU_UPDATE = '/admin/product/updateSpuInfo',
}

//获取已有spu列表
export const reqSPUList = (page: number,pageSize:number,c3ID:number|string) => request.get<any, SPUListResponseData>(API.SPU_LIST+`${page}/${pageSize}?category3Id=${c3ID}`);
//获取全部品牌
export const reqAllTrademarkList = () => request.get<any, AllTradeMarkListResponseData>(API.ALL_TRADEMARK_LIST);
//获取某个spu图片列表
export const reqSPUImageList = (spuId:number) => request.get<any, SPUImageListResponseData>(API.SPU_IMAGE_LIST+spuId);
//获取某个spu已有的销售属性列表
export const reqSPUAttrList = (spuId:number) => request.get<any, SPUAtteListResponseData>(API.SPU_ATTR_LIST+spuId);
//获取全部销售属性列表
export const reqSPUAllAttrList = () => request.get<any, SPUAllAtteListResponseData>(API.SPU_ALL_ATTR_LIST);
//添加spu或更新spu
export const reqAddOrUpdateSPU = (data: SPUModel) => {
    if(data.id) {
      return request.post<any, any>(API.SPU_UPDATE, data)
    } else {
      return request.post<any, any>(API.SPU_ADD, data)
    }
}
