<template>
    <div>
        <el-form label-width="100">
            <el-form-item label="SKU名称">
                <el-input placeholder="SKU名称"></el-input>
            </el-form-item>
            <el-form-item label="价格（元）">
                <el-input placeholder="价格（元）" type="number"></el-input>
            </el-form-item>
            <el-form-item label="重量（克）">
                <el-input placeholder="重量（克）" type="number"></el-input>
            </el-form-item>
            <el-form-item label="SKU描述">
                <el-input placeholder="SKU描述" type="textarea"></el-input>
            </el-form-item>

            <el-form-item label="平台属性">
                <el-form :inline="true">
                    <el-form-item v-for="(item,index) in attrList" :key="index" :label="item.attrName" style="margin-bottom: 10px;">
                        <el-select style="width: 220px;">
                            <el-option v-for="(tag, index) in item.attrValueList" :key="index" :label='tag.valueName' :value="tag.attrId"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>

            </el-form-item>
            <el-form-item label="销售属性">
                <el-form :inline="true">
                    <el-form-item v-for="(item,index) in spuAttrList" :key="index" :label="item.saleAttrName">
                        <el-select style="width: 220px;">
                            <el-option v-for="(attr,index) in item.spuSaleAttrValueList" :key='index' :label="attr.saleAttrValueName" :value="attr.baseSaleAttrId"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>

            </el-form-item>

            <el-form-item label="图片名称">
                <el-table border :data="imageList">
                    <el-table-column type="selection" width="60" align="center">
                    </el-table-column>
                    <el-table-column label="图片">
                        <template #="{ row }">
                             <img :src="row.imgUrl" alt="" style="width: 100px;height: 100px;" />
                        </template>
                    </el-table-column>
                    <el-table-column prop="imgName" label="名称">
                    </el-table-column>
                    <el-table-column label="操作">
                    </el-table-column>
                </el-table>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="saveClick">保存</el-button>
                <el-button type="primary" @click="cancelClick">取消</el-button>

            </el-form-item>

        </el-form>
    </div>
</template>

<script setup lang="ts" name="skuForm">
import { reqSPUImageList,reqSPUAttrList } from '@/api/product/SPU';
import type { SPUModel,SPUImageModel,SPUImageListResponseData,SPUAtteListResponseData,SPUAttrModel } from '@/api/product/SPU/type';
import { reqAttrList } from '@/api/product/attr';
import type { AttrListResponseData,AttrModel } from '@/api/product/attr/type';
import {ref} from 'vue';
import { ElMessage } from 'element-plus';

let imageList = ref<SPUImageModel[]>([]);

let attrList = ref<AttrModel[]>([]);
//销售属性
let spuAttrList = ref<SPUAttrModel[]>([]);



//按钮点击
//取消
function cancelClick() {
    console.log('cancelClick');
    myEmits('cancelClick');
}
//保存
function saveClick() {

    myEmits('saveClick');
}



//初始化数据
async function initData(c1ID: number = 0, c2ID: number = 0, spuModel: SPUModel) {

    const requests = [reqAttrList(c1ID, c2ID, spuModel.category3Id!), reqSPUImageList(spuModel.id ?? 0), reqSPUAttrList(spuModel.id ?? 0)];
    try {
        const responses = await Promise.all(requests);
        

        //属性列表
        let attrRes: AttrListResponseData = responses[0] as AttrListResponseData;
        if(attrRes.code == 200) {
            attrList.value = attrRes.data;
        } else {
            ElMessage.error('获取属性信息失败');
        }


        let imageRes: SPUImageListResponseData = responses[1] as SPUImageListResponseData;
        if(imageRes.code == 200) {
            imageList.value = imageRes.data;
        } else {
            ElMessage.error('获取图片信息失败');
        }
        let apuAttrRes:SPUAtteListResponseData = responses[2] as SPUAtteListResponseData;
        if(apuAttrRes.code == 200) {
            spuAttrList.value = apuAttrRes.data;
        } else {
            ElMessage.error('获取SPU属性信息失败');
        }

    } catch (error) {
        ElMessage.error('获取SKU信息失败');
    }

}

let myEmits = defineEmits(['cancelClick', 'saveClick']);

//暴漏方法
defineExpose({
    initData
})
</script>

<style scoped></style>