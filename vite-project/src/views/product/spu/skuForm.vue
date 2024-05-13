<template>
    <div>
        <el-form label-width="100">
            <el-form-item label="SKU名称">
                <el-input placeholder="SKU名称" v-model="skuModel.skuName"></el-input>
            </el-form-item>
            <el-form-item label="价格（元）">
                <el-input placeholder="价格（元）" type="number" v-model="skuModel.price"></el-input>
            </el-form-item>
            <el-form-item label="重量（克）">
                <el-input placeholder="重量（克）" type="number" v-model="skuModel.weight"></el-input>
            </el-form-item>
            <el-form-item label="SKU描述">
                <el-input placeholder="SKU描述" type="textarea" v-model="skuModel.skuDesc"></el-input>
            </el-form-item>

            <el-form-item label="平台属性">
                <el-form :inline="true">
                    <el-form-item v-for="(item, index) in attrList" :key="index" :label="item.attrName"
                        style="margin-bottom: 10px;">
                        <el-select style="width: 220px;" v-model="item.selectedString">
                            <el-option v-for="(tag, index) in item.attrValueList" :key="index" :label='tag.valueName'
                                :value="item.id + '|' + tag.id + '|' + tag.valueName"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>

            </el-form-item>
            <el-form-item label="销售属性">
                <el-form :inline="true">
                    <el-form-item v-for="(item, index) in spuAttrList" :key="index" :label="item.saleAttrName">
                        <el-select style="width: 220px;" v-model="item.selectedString">
                            <el-option v-for="(attr, index) in item.spuSaleAttrValueList" :key='index'
                                :label="attr.saleAttrValueName"
                                :value="item.id + '|' + attr.baseSaleAttrId + '|' + attr.saleAttrValueName"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>

            </el-form-item>

            <el-form-item label="图片名称">
                <el-table border :data="imageList" ref="tableRef">
                    <el-table-column type="selection" width="60" align="center" :selectable="() => false">
                    </el-table-column>
                    <el-table-column label="图片">
                        <template #="{ row }">
                            <img :src="row.imgUrl" alt="" style="width: 100px;height: 100px;" />
                        </template>
                    </el-table-column>
                    <el-table-column prop="imgName" label="名称">
                    </el-table-column>
                    <el-table-column label="操作">
                        <template #="{ row }">
                            <el-button type="primary" size="small" @click="setDefaultClick(row)">设置默认</el-button>
                        </template>
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
import { reqSPUImageList, reqSPUAttrList, reqAddSKU } from '@/api/product/SPU';
import type { SPUModel, SPUImageModel, SPUImageListResponseData, SPUAtteListResponseData, SPUAttrModel, SKUModel } from '@/api/product/SPU/type';
import { reqAttrList } from '@/api/product/attr';
import type { AttrTagModel, AttrListResponseData, AttrModel } from '@/api/product/attr/type';
import { ref } from 'vue';
import { ElMessage } from 'element-plus';

let tableRef = ref();

let imageList = ref<SPUImageModel[]>([]);

let attrList = ref<AttrModel[]>([]);
//销售属性
let spuAttrList = ref<SPUAttrModel[]>([]);

let skuModel = ref<SKUModel>(
    {
        category3Id: '',
        spuId: 0,
        tmId: '',
        skuName: '',
        price: 0,
        skuDesc: '',
        skuDefaultImg: '',
        skuAttrValueList: [],
        // skuSaleAttrValueList: [],
        weight: 0,
    }
);


//按钮点击
//取消
function cancelClick() {
skuModel = ref<SKUModel>(
    {
        category3Id:'',
        spuId: 0,
        tmId: '',
        skuName: '',
        price: 0,
        skuDesc: '',
        skuAttrValueList: [],
        skuDefaultImg: '',
        // skuSaleAttrValueList: [],
        weight: 0,
    }
    );
    myEmits('cancelClick');

}
//保存
async function saveClick() {


    //reduce方法介绍：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
    //reduce方法的第一个参数是一个函数，函数的第一个参数是上一次的返回值，第二个参数是遍历的每一个元素
    skuModel.value.skuAttrValueList = attrList.value.reduce((pre: AttrTagModel[], cur) => {
        if (cur.selectedString != '' && cur.selectedString != null) {
            let arr = cur.selectedString?.split('|');
            if (arr.length == 3) {
                let attrId = parseInt(arr[0]);
                let id = parseInt(arr[1]);
                let valueName = arr[2]
                pre.push({
                    valueId: id,
                    attrId: attrId,
                    valueName: valueName,
                });
            }
        }
        return pre;
    }, []);

    // spuAttrList.value.map((item) => {
    //     if (item.selectedString != '' && item.selectedString != null) {
    //         let arr = item.selectedString?.split('|');
    //         if (arr.length == 3) {
    //             let attrId = parseInt(arr[0]);
    //             let id = parseInt(arr[1]);
    //             let saleAttrValueName = arr[2]
    //             skuModel.value.skuSaleAttrValueList.push({
    //                 id: id,
    //                 baseSaleAttrId: attrId,
    //                 saleAttrValueName: saleAttrValueName,
    //             });
    //         }
    //     }

    // });

    let result = await reqAddSKU(skuModel.value);
    if (result.code == 200) {
        ElMessage.success('添加成功');
        myEmits('saveClick');
    } else {
        ElMessage.error('添加失败');
    }
}

function setDefaultClick(row: SPUImageModel) {
    //取消全部选择
    tableRef.value.clearSelection();
    tableRef.value.toggleRowSelection(row, true);
    skuModel.value.skuDefaultImg = row.imgUrl ?? "";

}



//初始化数据
async function initData(c1ID: number = 0, c2ID: number = 0, spuModel: SPUModel) {
    if (spuModel == null) {
        return;
    }

    skuModel.value.category3Id = spuModel.category3Id ?? '';
    skuModel.value.spuId = spuModel.id ?? 0;
    skuModel.value.tmId = spuModel.tmId ?? '';

    const requests = [reqAttrList(c1ID, c2ID, spuModel.category3Id!), reqSPUImageList(spuModel.id ?? 0), reqSPUAttrList(spuModel.id ?? 0)];
    try {
        const responses = await Promise.all(requests);


        //属性列表
        let attrRes: AttrListResponseData = responses[0] as AttrListResponseData;
        if (attrRes.code == 200) {
            attrList.value = attrRes.data;
        } else {
            ElMessage.error('获取属性信息失败');
        }


        let imageRes: SPUImageListResponseData = responses[1] as SPUImageListResponseData;
        if (imageRes.code == 200) {
            imageList.value = imageRes.data;
        } else {
            ElMessage.error('获取图片信息失败');
        }
        let apuAttrRes: SPUAtteListResponseData = responses[2] as SPUAtteListResponseData;
        if (apuAttrRes.code == 200) {
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