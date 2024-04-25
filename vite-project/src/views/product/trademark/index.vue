<template>
    <el-card>
        <el-button type="primary" icon="Plus">添加品牌</el-button>

        <el-table :data="trademarkList" style="margin: 10px 0px" border >
            <el-table-column label="序号" width="100" type="index"/>
            <el-table-column label="品牌名称" prop="tmName"/>
            <el-table-column label="品牌LOGO">
                <template #="{row,$index}">
                    <img :src="row.logoUrl" alt="" style="width: 100px;height: 100px;"/>
                </template>
            </el-table-column>
            <el-table-column label="品牌操作">
                <template #="{row,$index}">
                    <el-button type="primary" size="small">编辑</el-button>
                    <el-button type="danger" size="small">删除</el-button>
                </template>
            </el-table-column>
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
import { ref , onMounted } from 'vue';
import { reqTrademarkList } from '@/api/product/trademark';
import type { TradeMarkListResponseData, TradeMark } from '@/api/product/trademark/type';

let currentPage = ref<number>(1);

let pageSize = ref<number>(3);

let total = ref<number>(100);

let trademarkList = ref<TradeMark[]>([]);

//获取数据
async function fetchTradeMarkList() {
    let response:TradeMarkListResponseData = await reqTrademarkList(currentPage.value,pageSize.value);
    if(response.code == 200) {
        trademarkList.value = response.data.records;
        total.value = response.data.total;
    } else {
        console.log("fetchTradeMarkList error");
    }
}

onMounted(() => {
    fetchTradeMarkList();
});



function handleSizeChange (value:number){
    //value 当前size
    currentPage.value = 1;
    fetchTradeMarkList();

}

function handleCurrentChange (value:number){
    //value 当前页
    fetchTradeMarkList();
}

</script>

<style scoped></style>