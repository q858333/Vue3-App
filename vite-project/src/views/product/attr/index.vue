<template>
    <div>
        <el-card>
            <Category @c3Change="c3Change()"></Category>
        </el-card>

        <el-card style="margin:10px 0px">
            <el-button type="primary" icon="Plus" @click="addAttrClick">添加属性</el-button>

            <el-table border style="margin: 10px 0px;" :data="attrList">
                <el-table-column label="序号" type="index" width="100" align="center"></el-table-column>
                <el-table-column label="属性名称" width="200" prop="attrName"></el-table-column>
                <el-table-column label="属性值名称">
                    <template #default="{ row }">
                        <el-tag style="margin: 5px;" v-for="item in row.attrValueList" :key="item.id" type="info">{{ item.valueName }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="200">
                    <template #default="{ row }">
                        <el-button type="primary" size="small">编辑</el-button>
                        <el-button type="danger" size="small">删除</el-button>

                    </template>
                </el-table-column>

            </el-table>

        </el-card>
    </div>
</template>

<script setup lang="ts">

// import { onMounted } from 'vue';
import Category from '@/components/Category.vue';
import useCategoryStore from '@/store/modules/category';
import { reqAttrList } from '@/api/product/attr'
import type { AttrListResponseData, AttrModel } from '@/api/product/attr/type'
import { ElMessage } from 'element-plus';
import {ref} from 'vue';
let attrList = ref<AttrModel[]>([]);

let useCategory = useCategoryStore();

function c3Change() {
    console.log('fetchAttrList');
    fetchAttrList();
}

async function fetchAttrList() {
    attrList.value = [];
    if (useCategory.c1ID && useCategory.c2ID && useCategory.c3ID) {
        let result: AttrListResponseData = await reqAttrList(useCategory.c1ID, useCategory.c2ID, useCategory.c3ID);
        if (result.code == 200) {
            attrList.value = result.data;
        } else {
            ElMessage.error('获取属性列表失败');
        }
    }
}

function addAttrClick() {

}

</script>

<style scoped></style>