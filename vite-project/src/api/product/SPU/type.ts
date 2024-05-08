import { ResponseData } from "@/api/base/type"


export interface SPUModel {
    id: number
    spuName: string
    description: string
    category3Id: number
    tmId: number
    spuSaleAttrList: []
    spuImageList: []
    spuPosterList:[]

}

export interface SPUListResponseData extends ResponseData {
    data:{
        records: SPUModel[]
        total: number
    }
} 