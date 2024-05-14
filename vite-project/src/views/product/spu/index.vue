<template>
    <div>
        <Category @c3Change="c3Change" :enable="scene==0"></Category>

        <el-card style="margin: 10px 0px;">
            <div v-show="scene==0">
                <el-button type="primary" @click="addSpuClick" :disabled="!useCategory.c3ID">添加SPU</el-button>
                <el-table border style="margin: 10px 0px;" :data="spuList">
                    <el-table-column label="序号" type="index" width="80" align="center"></el-table-column>
                    <el-table-column label="SPU名称" prop="spuName"></el-table-column>
                    <el-table-column label="SPU描述" prop="description"></el-table-column>
                    <el-table-column label="操作">
                        <template #default="{ row ,$index}">
                            <el-button type="primary" size="small" @click="addSKUClick(row)" icon="Plus" title="添加SKU"></el-button>
                            <el-button type="warning" size="small" @click="editClick(row)" icon="Edit" title="修改SPU"></el-button>
                            <el-button type="info" size="small" @click="infoClick(row)" icon="InfoFilled" title="查看SKU"></el-button>
                            <el-popconfirm title="Are you sure to delete?" icon="Delete" icon-color="red" width="250" @confirm=deleteClick(row)>
                                <template #reference>
                                  <el-button type="danger" size="small" icon="Delete" title="删除SPU"></el-button>
                                </template>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[3, 6, 9]"
                :background="true" layout="prev, pager, next ,->, total, sizes,jumper" :total="total"
                @size-change="handleSizeChange" @current-change="handleCurrentChange" />
            </div>
            <div v-show="scene == 1" >
                <skuForm ref='skuRef' @cancelClick="changeDefaultScene" @saveClick="changeDefaultScene"></skuForm>
            </div>
            <div v-show="scene == 2">
                <spuForm ref='spuRef' @cancelClick="changeDefaultScene" @saveClick="changeDefaultScene"></spuForm>
            </div>
        </el-card>

        <el-dialog v-model="skuListDialogShow" title="SKU列表">
            <el-table border :data="skuList">
                <el-table-column label="SKU名称" prop="skuName"></el-table-column>
                <el-table-column label="SKU价格" prop="price"></el-table-column>
                <el-table-column label="SKU重量" prop="weight"></el-table-column>
                <el-table-column label="SKU图片" >
                    <template #default="{ row }">
                        <img :src="row.skuDefaultImg" :alt="row.skuDesc" style="width: 100px;height: 100px;" />
                    </template>
                </el-table-column>

            </el-table>


        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue';
import Category from '@/components/Category.vue';
import {reqFindSKUList, reqSPUList, reqDeleteSPU} from '@/api/product/SPU';

import useCategoryStore from '@/store/modules/category';
import type {SKUModel, SPUListResponseData,SPUModel} from  '@/api/product/SPU/type';
import { ElMessage } from 'element-plus';
import skuForm from './skuForm.vue';
import spuForm from './spuForm.vue';

//sku弹窗
let skuListDialogShow = ref(false);
let skuList = ref<SKUModel[]>([]);

let spuRef = ref();
let skuRef = ref();

//当前页
let currentPage = ref(1);
//每页显示条数
let pageSize = ref(3);
//总条数
let total = ref(0);
//分类
let useCategory = useCategoryStore();
//SPU列表
let spuList = ref<SPUModel[]>([]);
//场景 0 默认。1 sku。2 spu
let scene = ref(0);

onBeforeUnmount(()=>{
    useCategory.$reset();
})


onMounted(() => {
    console.log('onMounted');
})

function handleCurrentChange () {
    c3Change();
}

function handleSizeChange () {
    currentPage.value = 1;
    c3Change();
}

async function c3Change() {
    if(!useCategory.c3ID){
        ElMessage.warning('请选择三级分类');
        return;
    }

    let result:SPUListResponseData = await reqSPUList(currentPage.value, pageSize.value, useCategory.c3ID);
    if(result.code == 200) {
        spuList.value = result.data.records;
        total.value = result.data.total;
    }

}

function addSpuClick () {
    scene.value = 2;
    spuRef.value.initAddSPUData(useCategory.c3ID);

}

function addSKUClick (row:SPUModel) {
    scene.value = 1;
    skuRef.value.initData(useCategory.c1ID,useCategory.c2ID,row);


}

async function editClick (row:SPUModel) {
    scene.value = 2;
    spuRef.value.initEditSPUData(row);

}

async function infoClick (row:SPUModel) {
    let result = await reqFindSKUList(row.id??0);
    if(result.code == 200){
        skuListDialogShow.value = true;
        skuList.value = result.data;
    } else {
        ElMessage.error('获取SKU列表失败');
    }
    console.log(result);


}

async function deleteClick (row:SPUModel) {
    let result = await reqDeleteSPU(row.id??0);
    if(result.code == 200) {
        ElMessage.success('删除成功');
        
        currentPage.value = (spuList.value.length >= 1 && currentPage.value > 1 ? currentPage.value - 1 : currentPage.value);
        c3Change();
    }  else {
        ElMessage.error('删除失败');
    }

}

function changeDefaultScene () {
    console.log('changeDefaultScene');
    scene.value = 0;
    c3Change();

}

</script>

<style scoped lang="scss">

</style>