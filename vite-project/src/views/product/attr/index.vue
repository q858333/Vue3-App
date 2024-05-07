<template>
    <div>
        <Category @c3Change="c3Change()" :enable="isShowList"></Category>
        

        <el-card style="margin:10px 0px">
            <div v-show="isShowList">
                <el-button type="primary" icon="Plus" @click="addClick" :disabled="!useCategory.c3ID">添加属性</el-button>
                <el-table border style="margin: 10px 0px;" :data="attrList">
                <el-table-column label="序号" type="index" width="100" align="center"></el-table-column>
                <el-table-column label="属性名称" width="200" prop="attrName"></el-table-column>
                <el-table-column label="属性值名称">
                    <template #default="{ row }">
                        <el-tag style="margin: 5px;" v-for="item in row.attrValueList" :key="item.id" type="primary">{{ item.valueName }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="200">
                    <template #default="{ row }">
                        <el-button type="primary" size="small" @click="editClick(row)">编辑</el-button>
                        <el-button type="danger" size="small" @click="deleteClick(row)">删除</el-button>
                    </template>
                </el-table-column>

                </el-table>
            </div>
            <div v-show="!isShowList">
                <el-form>
                    <el-form-item label="属性名称">
                        <el-input placeholder="输入名称"></el-input>
                    </el-form-item>
                </el-form>
                <el-button type="primary" size="default" icon="Plus" @click="addAttrClick">添加属性值</el-button>
                <el-button type="primary" size="default" @click="cancelClick">取消</el-button>
                <el-table border style="margin: 10px 0px;">
                    <el-table-column label="序号" type="index" width="100" align="center"></el-table-column>
                    <el-table-column label="属性值名称"></el-table-column>
                    <el-table-column label="属性值操作"></el-table-column>
                </el-table>
                <el-button type="primary" size="default" @click="saveClick">保存</el-button>
                <el-button type="primary" size="default" @click="cancelClick">取消</el-button>

            </div>
           

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

let isShowList = ref(true);
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
function addClick () {
    isShowList.value = false;
}


function editClick (row:AttrModel) {
    console.log(row);
    isShowList.value = false;

}

function deleteClick (row:AttrModel) {
    console.log(row);

}


function cancelClick () {
    isShowList.value = true;

}
function saveClick () {

}

function addAttrClick() {

}


</script>

<style scoped></style>