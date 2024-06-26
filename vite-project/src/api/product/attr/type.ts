
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


export interface AttrTagModel {
    id?:number
    valueName:string
    attrId?:number
    isEditing?:boolean
    valueId?:number

}

export interface AttrModel {
    id?:number
    attrName:string
    categoryId:number|string
    categoryLevel:number
    attrValueList:AttrTagModel[]
    selectedString?: string

}

export interface AttrListResponseData extends ResponseData {
    data:AttrModel[],
}