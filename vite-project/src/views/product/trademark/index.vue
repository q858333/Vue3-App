<template>
    <el-card>
        <el-button type="primary" icon="Plus">添加品牌</el-button>

        <el-table style="margin: 10px 0px" border>
            <el-table-column label="序号" width="100" />
            <el-table-column label="品牌名称" />
            <el-table-column label="品牌LOGO" />
            <el-table-column label="品牌操作" />
        </el-table>

        <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[3, 6, 9]"
      :background="true"
      layout="prev, pager, next ,->, total, sizes,jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';

let currentPage = ref(1);

let pageSize = ref(3);

let total = ref(100);

function handleSizeChange (){

}

function handleCurrentChange (){
    
}

</script>

<style scoped></style>