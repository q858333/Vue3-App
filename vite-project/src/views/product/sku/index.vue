<template>
    <div>
        <el-card style="margin: 10px 0px;width: 100%;">
            <el-table border>
                <el-table-column label="序号" type="index" width="100" align> </el-table-column>
                <el-table-column label="名称" width="200"> </el-table-column>
                <el-table-column label="描述" width="200"> </el-table-column>
                <el-table-column label="默认图片" width="200"> </el-table-column>
                <el-table-column label="重量" width="200"> </el-table-column>
                <el-table-column label="价格" width="200"> </el-table-column>
                <el-table-column label="名称" width="200"> </el-table-column>
                <el-table-column label="名称" width="200"> </el-table-column>

                <el-table-column label="操作" fixed="right" width="400"> </el-table-column>
            </el-table>        
        </el-card>
        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[10, 20, 30]"
                :background="true" layout="prev, pager, next ,->, total, sizes,jumper" :total="total"
                @size-change="handleSizeChange" @current-change="handleCurrentChange" />

    </div>
</template>

<script setup lang="ts">
import { onMounted,ref } from 'vue';

// 当前页
let currentPage = ref(1);
// 当前页显示条数
let pageSize = ref(10);
// 总条数
let total = ref(0);

// 分页大小改变
function handleSizeChange(val: number) {
    console.log(`每页 ${val} 条`);
}
// 当前页改变
function handleCurrentChange(val: number) {
    console.log(`当前页: ${val}`);
}


onMounted(() => {
    console.log('onMounted');
});

</script>

<style scoped></style>