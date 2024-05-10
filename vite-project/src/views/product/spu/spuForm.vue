<template>
    <el-form label-width="100">
        <el-form-item label="SPU名称">
            <el-input placeholder="输入名称" v-model="spuModel.spuName"></el-input>
        </el-form-item>
        <el-form-item label="SPU品牌">
            <el-select style="width: 200px;" v-model="spuModel.id" placeholder='选择品牌'>
                <el-option v-for="(item) in trademarkList" :label="item.tmName" :value="item.id"
                    :key="item.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="SPU描述">
            <el-input placeholder="输入描述" type="textarea" v-model="spuModel.description"> </el-input>
        </el-form-item>
        <el-form-item label="SPU照片">
            <el-upload v-model:file-list="imgList" :action='imgUploadUrl' list-type="picture-card"
                :on-preview="handlePictureCardPreview" :on-remove="handleRemoveImg" :on-success="handleUploadSuccess"
                :before-upload="handleBeforeUpload">
                <el-icon>
                    <Plus />
                </el-icon>
            </el-upload>
            <el-dialog v-model="dialogImgShow">
                <img w-full :src="dialogImgUrl" alt="preview image" style="width: 100%;height: 100%;" />
            </el-dialog>
        </el-form-item>
        <el-form-item label="SPU销售属性">
            <el-select style="width: 200px;" v-model="seletedSaleAttr" :placeholder="'未选择的销售属性:'+unSelectedSaleAttrList.length+'个' ">
                <el-option v-for="item in unSelectedSaleAttrList" :label="item.name" :value="item.id+'|'+item.name" :key="item.id"></el-option>
            </el-select>
            <el-button type="primary" :disabled="!seletedSaleAttr" icon="Plus" style="margin: 0px 10px;" @click="addAttrClick">添加销售属性</el-button>
            <el-table border style="margin: 10px 0px;" :data="spuModel.spuSaleAttrList">
                <el-table-column type="index" align="center" label="序号" width="100"></el-table-column>
                <el-table-column label="属性名" width="100" prop="saleAttrName"></el-table-column>
                <el-table-column label="属性值">
                    <template #="{ row,$index }">
                        <el-tag style="margin: 0px 5px;" v-for="(item, index) in row.spuSaleAttrValueList" :key="index"
                            closable @close="handleRemoveTag(index, row)"> {{ item.saleAttrValueName }} </el-tag>
                        <el-input style="width: 100px" v-if="row.isEditing" :ref="(vc:any)=>inputRef(vc,$index)" v-model="tagInputText" size="small"
                            @blur="handleTagInputConfirm(row)" />
                        <el-button v-else size="small" type='success' icon="Plus" @click="addTagClick(row,$index)">
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="130">
                    <template #="{$index}">
                        <el-popconfirm title="Are you sure to delete?" icon="Delete" icon-color="red" width="250" @confirm=deleteAttrClick($index)>
                                <template #reference>
                                    <el-button type="danger" icon="Delete"></el-button>
                                </template>
                            </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
            <el-button type="primary" @click="saveClick">保存</el-button>
            <el-button @click="cancelClick">取消</el-button>


        </el-form-item>

    </el-form>
</template>

<script setup lang="ts" name="spuForm">
import { ref, onMounted, nextTick, computed} from 'vue';
import { reqAllTrademarkList, reqSPUImageList, reqSPUAttrList, reqSPUAllAttrList, reqAddOrUpdateSPU } from '@/api/product/SPU';

import type { TradeMark } from '@/api/product/trademark/type';
import { ElMessage } from 'element-plus';
import { cloneDeep } from 'lodash';
import { SPUModel } from '@/api/product/SPU/type';
import type { SPUAllAtteListResponseData, SPUImageListResponseData, SPUAtteListResponseData, SPUAllAtteModel, SPUImageModel, SPUAttrModel } from '@/api/product/SPU/type';

const imgUploadUrl = ref<string>(import.meta.env.VITE_APP_BASE_API + "/admin/product/fileUpload");

let trademarkList = ref<TradeMark[]>([]);
let allPropList = ref<SPUAllAtteModel[]>([]);

let spuModel = ref<SPUModel>({
    spuName: '',
    description: '',
    tmId: 0,
    spuImageList: [],
});
let imgList = ref<SPUImageModel[]>([]);

//弹窗相关
let dialogImgUrl = ref('');
let dialogImgShow = ref<boolean>(false);

//tag
let tagInputRefList = ref<any[]>([]);
let tagInputText = ref('');

//销售属性
let seletedSaleAttr = ref<string>('');

let myEmit = defineEmits(['saveClick', 'cancelClick']);

onMounted(() => {
    fetchAllTradeMark();
}
)

async function fetchAllTradeMark() {
    let res = await reqAllTrademarkList();
    if (res.code == 200) {
        trademarkList.value = res.data;
    } else {
        ElMessage.error('获取品牌列表失败');
    }
}


//预览照片
function handlePictureCardPreview(file: any) {
    dialogImgUrl.value = file.url;
    dialogImgShow.value = true;
}
//删除照片
function handleRemoveImg(file: any) {
    console.log("handleRemove", file);
    // let index = spuModel.value.spuImageList?.findIndex((item:any) => {
    //     if(item.url == file.url) {
    //         return true;
    //     }
    //     return false;
    // });

    // if(spuModel.value.spuImageList && index != undefined && index != -1 && spuModel.value.spuImageList?.length > index )   {
    //     spuModel.value.spuImageList.splice(index, 1);
    // }

}

function handleUploadSuccess(response: any, file: any) {
    console.log("handleUploadSuccess", file);
    if (response.code == 200) {
        // spuModel.value.spuImageList?.push({
        //     imgName:file.name ,
        //     imgUrl: response.data,
        // });
    } else {
        ElMessage.error('上传失败');
    }

}
function handleBeforeUpload(rawFile: File) {
    console.log("handleBeforeUpload", rawFile);
    if (rawFile.type != 'image/jpeg' && rawFile.type != 'image/gif' && rawFile.type != 'image/png') {
        ElMessage.error('Avatar picture must be JPG format!')
        return false
    } else if (rawFile.size / 1024 / 1024 > 4) {
        ElMessage.error('Avatar picture size can not exceed 2MB!')
        return false
    }
    return true

}

//底部按钮
function cancelClick() {
    myEmit('cancelClick');

}

async function saveClick() {
    spuModel.value.spuImageList = imgList.value.map((item: SPUImageModel) => {
        return {
            imgName: item.name,
            imgUrl: item.url,
        }
    });


    let res = await reqAddOrUpdateSPU(spuModel.value);
    if (res.code == 200) {
        ElMessage.success(spuModel.value.id ? '更新SPU成功' : '添加SPU成功');
        myEmit('saveClick');
    } else {
        ElMessage.error(spuModel.value.id ? '更新SPU失败' : '添加SPU失败');
    }
}

//tag
function handleRemoveTag(index: number, row: SPUAttrModel) {
    row.spuSaleAttrValueList?.splice(index);
    row.isEditing = false;
}

function addTagClick (row:SPUAttrModel,index:number) {
    row.isEditing = true;
    
    nextTick(() => {
        tagInputRefList.value[index].focus();
    });

}

function inputRef (vc: any, index: number) {
    tagInputRefList.value[index] = vc;
}


//tag结束编辑
function handleTagInputConfirm (row: SPUAttrModel) {
    row.isEditing = false;
    if(tagInputText.value.trim() == '') {
        row.spuSaleAttrValueList?.pop();
        return;
    }
    if(!row.spuSaleAttrValueList) {
        return;
    }

    //如果存在相同的属性名称
    let result = row.spuSaleAttrValueList.find((item) => {
        return item.saleAttrValueName == tagInputText.value;
    });
    if(result != undefined) {
        ElMessage.error('属性值名称已存在');
        return;
    }


    row.spuSaleAttrValueList?.push({
        baseSaleAttrId: row.baseSaleAttrId,
        saleAttrValueName: '',
        saleAttrName: row.saleAttrName??"",
    });
    row.spuSaleAttrValueList[row.spuSaleAttrValueList.length-1].saleAttrValueName = tagInputText.value;
    tagInputText.value = ''; 
    
}

//操作按钮
//删除
function deleteAttrClick(index:number) {
    if(spuModel.value.spuSaleAttrList == null || spuModel.value.spuSaleAttrList.length <= index) {
        return;
    }
    console.log("deleteAttrClick",index,spuModel.value.spuSaleAttrList);
    spuModel.value.spuSaleAttrList?.splice(index,1);
}
//添加属性
function addAttrClick() {
    if(seletedSaleAttr.value == '' || seletedSaleAttr.value == null) {
        ElMessage.error('请选择销售属性');
        return;
    }

    let list =seletedSaleAttr.value.split('|');
    if(list.length != 2) {
        return;
    }
    spuModel.value.spuSaleAttrList?.push({
        baseSaleAttrId: Number(list[0]),
        spuSaleAttrValueList: [],
        saleAttrName: list[1],
    });
    seletedSaleAttr.value='';
}



//初始化
async function initData(spu: SPUModel) {

    spuModel.value = cloneDeep(spu);
    if (trademarkList.value.length == 0) {
        fetchAllTradeMark();
    }

    const requests = [reqSPUImageList(spu.id ?? 0), reqSPUAttrList(spu.id ?? 0), reqSPUAllAttrList()];

    try {
        const responses = await Promise.all(requests);
        // 所有请求完成后的处理逻辑
        let imageRes: SPUImageListResponseData = responses[0] as SPUImageListResponseData;
        imgList.value = imageRes.data.map((item) => {
            return {
                name: item.imgName,
                url: item.imgUrl,
            }
        });
        let attrRes: SPUAtteListResponseData = responses[1] as SPUAtteListResponseData;
        spuModel.value.spuSaleAttrList = attrRes.data;
        let allAttrRes: SPUAllAtteListResponseData = responses[2] as SPUAllAtteListResponseData;
        allPropList.value = allAttrRes.data;
    } catch (error) {
        // 错误处理逻辑
        ElMessage.error('获取SPU信息失败');
    }

}

//计算属性
//计算没有选择的销售属性
let unSelectedSaleAttrList = computed(() => {
    return allPropList.value.filter((item) => {
        let result = spuModel.value.spuSaleAttrList?.find((saleAttr) => {
            return saleAttr.saleAttrName == item.name;
        });
        return result == undefined;
    });
});

//对外暴漏的方法
defineExpose({
    initData
})
</script>

<style scoped lang="scss"></style>