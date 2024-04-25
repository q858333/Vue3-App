
import type { ResponseData } from '@/api/base/type'

export interface TradeMark {
    id?: number
    name: string
    logoUrl: string
}

export interface TradeMarkListResponseData extends ResponseData {
    data: {
        records: TradeMark[]
        total: number
        size: number
        current: number
        pages: number
    }

}