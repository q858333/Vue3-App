
import request from '@/utils/request'
import type {TradeMarkListResponseData, TradeMark} from './type'

enum API {
    TRADEMARK_LIST = '/admin/product/baseTrademark',
    TRADEMARK_ADD = '/admin/product/baseTrademark/save',
    TRADEMARK_UPDATE = '/admin/product/baseTrademark/update',
    TRADEMARK_DELETE = '/admin/product/baseTrademark/remove',
}

/// 获取品牌列表
export const reqTrademarkList = (page: number, limit: number) => request.get<any, TradeMarkListResponseData>(API.TRADEMARK_LIST+`/${page}/${limit}`);

/// 添加/更新品牌
export const reqAddOrUpdateTrademark = (data: TradeMark) => {
    if(data.id) {
      return request.put<any, any>(API.TRADEMARK_UPDATE, data)
    } else {
      return request.post<any, any>(API.TRADEMARK_ADD, data)
    }
}

export const reqDeleteTrademark = (id: number) => request.delete<any, any>(API.TRADEMARK_DELETE+`/${id}`);

