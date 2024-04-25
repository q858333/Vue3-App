
import request from '@/utils/request'
import type {TradeMarkListResponseData} from './type'

enum API {
    TRADEMARK_LIST = '/admin/product/baseTrademark',
}

export const reqTrademarkList = (page: number, limit: number) => request.get<any, TradeMarkListResponseData>(API.TRADEMARK_LIST+`/${page}/${limit}`);