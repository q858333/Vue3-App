<template>
    <div>
        <Category @c3Change="c3Change" :enable="isShowList"></Category>
    </div>
    <div>
        <el-card style="margin: 10px 0px;">
            <el-button type="primary" @click="addSpuClick">添加SPU</el-button>
            <div v-if="isShowList">
                <el-table border style="margin: 10px 0px;">
                    <el-table-column label="序号" type="index" width="80"></el-table-column>
                    <el-table-column label="SPU名称"></el-table-column>
                    <el-table-column label="SPU描述"></el-table-column>
                    <el-table-column label="操作"></el-table-column>
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

let isShowList = ref(true);
let currentPage = ref(1);
let pageSize = ref(3);
let total = ref(10);


onMounted(() => {
    console.log('onMounted');
})

function handleCurrentChange () {

}

function handleSizeChange () {

}

function c3Change() {

}

function addSpuClick () {

}


</script>

<style scoped>

</style>