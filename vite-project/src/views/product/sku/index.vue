<template>
    <div>
        <el-card style="margin: 10px 0px;width: 100%;">
            <el-table border :data="skuList">
                <el-table-column label="序号" type="index" width="100" align> </el-table-column>
                <el-table-column label="名称" width="200" prop="skuName"> </el-table-column>
                <el-table-column label="描述" width="300" prop="skuDesc"> </el-table-column>
                <el-table-column label="默认图片" width="150"> 
                    <template #default="{ row }">
                        <img :src="row.skuDefaultImg" :alt="row.skuDesc" style="width: 100px;height: 100px;" />
                    </template>
                </el-table-column>
                <el-table-column label="重量(克)" width="200" prop="weight"> </el-table-column>
                <el-table-column label="价格(元)" width="200" prop="price"> </el-table-column>

                <el-table-column label="操作" fixed="right" width="400"> 
                    <template #default="{ row }">
                        <el-button type="primary" size="small" :icon="row.isSale==0?'Top':'Bottom'" @click="saleClick(row)"></el-button>
                        <el-button type="primary" size="small" icon="Edit" @click="editClick(row)"></el-button>
                        <el-button type="info" size="small" icon="InfoFilled" @click="infoClick(row)"></el-button>
                        <el-popconfirm title="Are you sure to delete?" icon="Delete" icon-color="red" width="250" @confirm=deleteClick(row)>
                            <template #reference>
                                <el-button type="danger" size="small">删除</el-button>
                            </template>
                        </el-popconfirm>
                    </template>


                </el-table-column>
            </el-table>        
        </el-card>
        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[10, 20, 30]"
                :background="true" layout="prev, pager, next ,->, total, sizes,jumper" :total="total"
                @size-change="handleSizeChange" @current-change="handleCurrentChange" />

    </div>
</template>

<script setup lang="ts">
import { onMounted,ref } from 'vue';
import type {AllSKUListResponseData} from '@/api/product/SKU/type';
import {reqSKUList,reqChangeSKUSaleStatus} from '@/api/product/SKU';
import { ElMessage } from 'element-plus';
import type { SKUModel } from '@/api/product/SPU/type';
// 当前页
let currentPage = ref(1);
// 当前页显示条数
let pageSize = ref(10);
// 总条数
let total = ref<number>(0);

let skuList = ref<SKUModel[]>([]);

// 分页大小改变
function handleSizeChange() {
    currentPage.value = 1;
    fetchSKUList();
}
// 当前页改变
function handleCurrentChange() {
    fetchSKUList();
}


onMounted(() => {
    fetchSKUList();
});

async function fetchSKUList() {
    let result:AllSKUListResponseData = await reqSKUList(currentPage.value,pageSize.value);
    if(result.code == 200) {
        total.value = result.data.total;
        skuList.value = result.data.records;
    } else {
        //获取失败提示
        ElMessage.error('获取失败');

    }
}

//按钮点击
//编辑按钮
function editClick (row:SKUModel) {

}
//详情按钮
function infoClick (row:SKUModel) {

}
//删除按钮
function deleteClick (row:SKUModel) {

}
//上架下架按钮
async function saleClick (row:SKUModel) {
    let isSale = row.isSale;
    if(row.isSale == 0) {
        isSale = 1;
    } else {
        isSale = 0;
    }
    //调用接口
    let result = await reqChangeSKUSaleStatus(row.id??0,isSale);
    if(result.code == 200){
        if(isSale == 0 ){
            ElMessage.warning('下架成功');
        } else {
            ElMessage.success('上架成功');
        }
        row.isSale = isSale;
    } else {
        ElMessage.error('操作失败');
    }
}


</script>

<style scoped></style>