<template>
    <div>
        <el-card>
           <el-form :inline="true" >
                <el-form-item label="一级分类" class="form-item-class">
                     <el-select v-model="useCategory.c1ID" @change="useCategory.c1Change()">
                        <el-option v-for="item in useCategory.c1List" :label=item.name :value=item.id></el-option>
                     </el-select>
                </el-form-item>

                <el-form-item label="二级分类" class="form-item-class">
                     <el-select v-model="useCategory.c2ID" @change="useCategory.c2Change()">
                        <el-option v-for="item in useCategory.c2List" :label=item.name :value=item.id></el-option>
                     </el-select>
                </el-form-item>
                <el-form-item label="三级分类" class="form-item-class">
                    <el-select v-model="useCategory.c3ID" >
                        <el-option v-for="item in useCategory.c3List" :label=item.name :value=item.id></el-option>
                     </el-select>
                </el-form-item>

           </el-form>
           

        </el-card >

        <el-card style="margin:10px 0px">   
            <el-button type="primary" icon="Plus" @click="addAttrClick">添加属性</el-button>

            <el-table border style="margin: 10px 0px;">
                <el-table-column label="序号" type="index" width="100" align="center"></el-table-column>
                <el-table-column label="属性名称" width="200"></el-table-column>
                <el-table-column label="属性值名称" ></el-table-column>
                <el-table-column label="操作" width="200"></el-table-column>

            </el-table>

        </el-card>
    </div>
</template>

<script setup lang="ts">

import { onMounted } from 'vue';
import useCategoryStore from '@/store/modules/category';

let useCategory = useCategoryStore();

onMounted(() => {
    initData();
})

function initData () {
    console.log('attr fetchC1List');
    useCategory.fetchC1List();

}


function addAttrClick (){

}

</script>

<style scoped>
.form-item-class {
    width: 300px;
}

</style>