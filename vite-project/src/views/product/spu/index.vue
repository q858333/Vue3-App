<template>
    <div>
        <Category @c3Change="c3Change" :enable="isShowList"></Category>
    </div>
    <div>
        <el-card style="margin: 10px 0px;">
            <el-button type="primary" @click="addSpuClick">添加SPU</el-button>
            <div v-if="isShowList">
                <el-table border style="margin: 10px 0px;" :data="spuList">
                    <el-table-column label="序号" type="index" width="80" align="center"></el-table-column>
                    <el-table-column label="SPU名称" prop="spuName"></el-table-column>
                    <el-table-column label="SPU描述" prop="description"></el-table-column>
                    <el-table-column label="操作">
                        <template #default="{ row ,$index}">
                            <el-button type="primary" size="small" @click="addClick(row)" icon="Plus"></el-button>
                            <el-button type="warning" size="small" @click="editClick(row)" icon="Edit"></el-button>
                            <el-button type="info" size="small" @click="infoClick(row)" icon="InfoFilled"></el-button>
                            <el-popconfirm title="Are you sure to delete?" icon="Delete" icon-color="red" width="250" @confirm=deleteClick(row)>
                                <template #reference>
                                  <el-button type="danger" size="small" icon="Delete"></el-button>
                                </template>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[3, 6, 9]"
                :background="true" layout="prev, pager, next ,->, total, sizes,jumper" :total="total"
                @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Category from '@/components/Category.vue';
import {reqSPUList} from '@/api/product/SPU';
import useCategoryStore from '@/store/modules/category';
import {SPUListResponseData,SPUModel} from  '@/api/product/SPU/type';

let isShowList = ref(true);
let currentPage = ref(1);
let pageSize = ref(3);
let total = ref(0);

let useCategory = useCategoryStore();
 
let spuList = ref<SPUModel[]>([]);


onMounted(() => {
    console.log('onMounted');
})

function handleCurrentChange () {
    c3Change();

}

function handleSizeChange () {
    c3Change();
}

async function c3Change() {

    let result:SPUListResponseData = await reqSPUList(currentPage.value, pageSize.value, useCategory.c3ID);
    if(result.code == 200) {
        spuList.value = result.data.records;
        total.value = result.data.total;
    }

}

function addSpuClick () {

}

function addClick (row:SPUModel) {

}

function editClick (row:SPUModel) {

}

function infoClick (row:SPUModel) {

}

function deleteClick (row:SPUModel) {

}

</script>

<style scoped>

</style>