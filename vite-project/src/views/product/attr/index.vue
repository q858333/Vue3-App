<template>
    <div>
        <el-card>
            <Category></Category>
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

// import { onMounted } from 'vue';
import Category from '@/components/Category.vue';


function addAttrClick (){

}

</script>

<style scoped>

</style>