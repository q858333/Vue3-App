<template>
    <div>
        <el-card>
            <el-button type="primary" icon="Plus" @click="addTradeMarkClick">添加品牌</el-button>

            <el-table :data="trademarkList" style="margin: 10px 0px" border>
                <el-table-column label="序号" width="100" type="index" />
                <el-table-column label="品牌名称" prop="tmName" />
                <el-table-column label="品牌LOGO">
                    <template #="{ row, $index }">
                        <img :src="row.logoUrl" alt="" style="width: 100px;height: 100px;" />
                    </template>
                </el-table-column>
                <el-table-column label="品牌操作">
                    <template #="{ row, $index }">
                        <el-button type="primary" size="small" @click="editClick">编辑</el-button>
                        <el-button type="danger" size="small" @click="deleteClick">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[3, 6, 9]"
                :background="true" layout="prev, pager, next ,->, total, sizes,jumper" :total="total"
                @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </el-card>

        <el-dialog v-model="dialogFormVisible" title="添加品牌" width="500" >
            <el-form>
                <el-form-item label="品牌名称" label-width="100">
                    <el-input />
                </el-form-item>
                <el-form-item label="品牌LOGO" label-width="100">
                    <el-upload class="avatar-uploader" :show-file-list="false"
                        :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>

                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="confirmClick">
                        Confirm
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { reqTrademarkList } from '@/api/product/trademark';
import type { TradeMarkListResponseData, TradeMark } from '@/api/product/trademark/type';

let currentPage = ref<number>(1);

let pageSize = ref<number>(3);

let total = ref<number>(100);

let trademarkList = ref<TradeMark[]>([]);

let dialogFormVisible = ref<boolean>(false);

let imageUrl = ref<string>('');

//获取数据
async function fetchTradeMarkList() {
    let response: TradeMarkListResponseData = await reqTrademarkList(currentPage.value, pageSize.value);
    if (response.code == 200) {
        trademarkList.value = response.data.records;
        total.value = response.data.total;
    } else {
        console.log("fetchTradeMarkList error");
    }
}

function handleAvatarSuccess(response: any, ) {
console.log(response);
    imageUrl.value = URL.createObjectURL(response.raw);
}

function beforeAvatarUpload() {

}

function editClick() {
    dialogFormVisible.value = true;

}

function deleteClick() {

}


function confirmClick() {
    dialogFormVisible.value = false;
}

function addTradeMarkClick() {
    dialogFormVisible.value = true;
}

onMounted(() => {
    fetchTradeMarkList();
});



function handleSizeChange(value: number) {
    //value 当前size
    currentPage.value = 1;
    fetchTradeMarkList();

}

function handleCurrentChange(value: number) {
    //value 当前页
    fetchTradeMarkList();
}

</script>

<style scoped>
.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>