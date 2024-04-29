
import type { ResponseData } from '@/api/base/type'

export interface CategoryModel {
    id: number
    name: string
    createTime: string
    updateTime: string
}

export interface CategoryState {
      c1ID:number|string
      c1List:CategoryModel[]
      c2ID:number|string
      c3ID:number|string
      c2List:CategoryModel[]
      c3List:CategoryModel[]
}

export interface CategoryResponseData extends ResponseData {
    data:CategoryModel[],
}