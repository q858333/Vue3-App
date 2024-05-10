<template>
    <div>
        <Category @c3Change="c3Change" :enable="scene==0"></Category>
    </div>
    <div>
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
            <div v-show="scene == 1">
                <skuForm></skuForm>
            </div>
            <div v-show="scene == 2">
                <spuForm ref="spuRef" @cancelClick="changeDefaultScene" @saveClick="changeDefaultScene"></spuForm>
            </div>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue';
import Category from '@/components/Category.vue';
import {reqSPUList, reqSPUImageList} from '@/api/product/SPU';

import useCategoryStore from '@/store/modules/category';
import type {SPUListResponseData,SPUModel} from  '@/api/product/SPU/type';
import { ElMessage } from 'element-plus';
import skuForm from './skuForm.vue';
import spuForm from './spuForm.vue';

let spuRef = ref();

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

let selectedSpuModel = ref<SPUModel>({
    spuName: '',
    description: '',
    tmId: 0,
    category3Id: 0,
});

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


}

async function editClick (row:SPUModel) {
    scene.value = 2;
    spuRef.value.initEditSPUData(row);
 

}

function infoClick (row:SPUModel) {

}

function deleteClick (row:SPUModel) {

}

function changeDefaultScene () {
    scene.value = 0;
    c3Change();

}

</script>

<style scoped>

</style>