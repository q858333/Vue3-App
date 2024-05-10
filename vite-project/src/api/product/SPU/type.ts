import { ResponseData } from "@/api/base/type"
import {TradeMark} from '@/api/product/trademark/type'

export interface SPUModel {
    id?: number
    spuName: string
    description: string
    category3Id?: number
    tmId: number
    spuSaleAttrList?: SPUAttrModel[]
    spuImageList?: SPUImageModel[]
    spuPosterList?:[]
}

export interface SPUListResponseData extends ResponseData {
    data:{
        records: SPUModel[]
        total: number
    }
} 


export interface AllTradeMarkListResponseData extends ResponseData {
    data:TradeMark[]
} 


export interface SPUImageModel {
    id?: number
    imgName?: string
    imgUrl?: string
    name?: string
    url?: string
}
    
export interface SPUImageListResponseData extends ResponseData {
    data:SPUImageModel[]
} 


export interface SPUSaleAttrModel {
    baseSaleAttrId?: number
    id?: number
    isChecked?: string
    saleAttrValueName: string
    saleAttrName: string
    spuId?: number
}

export interface SPUAttrModel {
    baseSaleAttrId: number
    id?: number
    saleAttrName?: string
    spuId?: number
    spuSaleAttrValueList?: SPUSaleAttrModel[]
    isEditing?:boolean//是否正在编辑
}
    

export interface SPUAtteListResponseData extends ResponseData {
    data:SPUAttrModel[]
} 


export interface SPUAllAtteModel extends ResponseData {
    name:string
    id:number
} 
export interface SPUAllAtteListResponseData extends ResponseData {
    data:SPUAllAtteModel[]
} 