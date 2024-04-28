<template>
    <div>
        <el-card>
           <el-form :inline="true" >
                <el-form-item label="一级分类" class="form-item-class">
                     <el-select v-model="oneLevel">
                        <el-option label="鞋子" value="1"></el-option>
                        <el-option label="衣服" value="2"></el-option>
                        <el-option label="帽子" value="3"></el-option>
                     </el-select>
                </el-form-item>

                <el-form-item label="二级分类" class="form-item-class">
                     <el-select>
                        <el-option label="鞋子" value="1"></el-option>
                        <el-option label="衣服" value="2"></el-option>
                        <el-option label="帽子" value="3"></el-option>
                     </el-select>
                </el-form-item>
                <el-form-item label="三级分类" class="form-item-class">
                     <el-select>
                        <el-option label="鞋子" value="1"></el-option>
                        <el-option label="衣服" value="2"></el-option>
                        <el-option label="帽子" value="3"></el-option>
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

import { ref, onMounted } from 'vue';

let oneLevel = ref<string>('');

onMounted(() => {
    
})

function addAttrClick (){

}

</script>

<style scoped>
.form-item-class {
    width: 300px;
}

</style>