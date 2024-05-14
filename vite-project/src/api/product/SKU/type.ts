import type {ResponseData} from '@/api/base/type'
import type { SKUModel } from '../SPU/type'

export interface AllSKUListResponseData extends ResponseData {
    data:  {
        records:SKUModel[],
        total:number,
    } 
}