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

                        <el-button type="primary" size="small" @click="editClick($index, row)">编辑</el-button>

                        <el-popconfirm :title="'Are you sure to delete ' + row.tmName + '?'" icon="Delete" icon-color="red" width="250" @confirm=deleteClick(row)>
                            <template #reference>
                                <el-button type="danger" size="small">删除</el-button>
                            </template>
                        </el-popconfirm>

                    </template>
                </el-table-column>
            </el-table>

            <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[3, 6, 9]"
                :background="true" layout="prev, pager, next ,->, total, sizes,jumper" :total="total"
                @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </el-card>

        <el-dialog v-model="dialogFormVisible" :title="tradeMarkForm.id ? '修改品牌' : '添加品牌'" width="500"
            @close="closeDialog">
            <el-form ref="formRef" :model="tradeMarkForm" :rules="formRules">
                <el-form-item label="品牌名称" label-width="100" prop="tmName">
                    <el-input placeholder="请输入品牌名称" v-model="tradeMarkForm.tmName" />
                </el-form-item>
                <el-form-item label="品牌LOGO" label-width="100" prop="logoUrl">
                    <el-upload :action="imgUploadUrl" class="avatar-uploader" :show-file-list="false"
                        :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="tradeMarkForm.logoUrl" :src="tradeMarkForm.logoUrl" class="avatar" />
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
import { reqTrademarkList, reqAddOrUpdateTrademark, reqDeleteTrademark } from '@/api/product/trademark';
import type { TradeMarkListResponseData, TradeMark } from '@/api/product/trademark/type';
import { ElMessage } from 'element-plus'
const imgUploadUrl = ref<string>(import.meta.env.VITE_APP_BASE_API + "/admin/product/fileUpload");

let tradeMarkForm = ref<TradeMark>({
    tmName: '',
    logoUrl: ''
});

let currentPage = ref<number>(1);

let pageSize = ref<number>(3);

let total = ref<number>(100);

let trademarkList = ref<TradeMark[]>([]);

let dialogFormVisible = ref<boolean>(false);

let formRef = ref();

// trigger: 'blur' 失去焦点，‘change’发生变化
let formRules = {
    tmName: [
        { required: true, message: '请输入品牌名称', trigger: 'blur' },
        { min: 2, max: 10, message: '名称至少2个字符，最多10个字符', trigger: 'blur' },
    ],
    logoUrl: [
        {
            required: true, validator: (rule: any, value: any, callback: any) => {
                if (!value) {
                    callback(new Error('请上传品牌LOGO'));
                } else {
                    callback();
                }
            }
        },
    ]
};


onMounted(() => {
    fetchTradeMarkList();
});


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

function handleAvatarSuccess(response: any,) {
    console.log("handleAvatarSuccess", response);
    if (response.code == 200) {
        tradeMarkForm.value.logoUrl = response.data;
    } else {
        alert("上传失败");
    }
}

function beforeAvatarUpload(rawFile: File) {

    console.log("beforeAvatarUpload", rawFile);
    if (rawFile.type != 'image/jpeg' && rawFile.type != 'image/gif' && rawFile.type != 'image/png') {
        ElMessage.error('Avatar picture must be JPG format!')
        return false
    } else if (rawFile.size / 1024 / 1024 > 4) {
        ElMessage.error('Avatar picture size can not exceed 2MB!')
        return false
    }
    return true

}

function editClick(index: number, row: TradeMark) {
    tradeMarkForm.value = row;
    dialogFormVisible.value = true;

}

async function deleteClick(row: TradeMark) {
   
    let result = await reqDeleteTrademark(row.id ?? 0);
    if (result.code == 200) {
        if(trademarkList.value.length == 1 && currentPage.value > 1){
            currentPage.value = currentPage.value - 1;
        }
        fetchTradeMarkList();
        ElMessage.success("删除成功");
    } else {
        ElMessage.error("删除失败");
    }
}


async function confirmClick() {

    try {
        await formRef.value.validate();
    } catch (e) {
        ElMessage.error("请完成信息填写");
        return;
    }

    let result = await reqAddOrUpdateTrademark(tradeMarkForm.value);
    if (result.code == 200) {
        fetchTradeMarkList();
        ElMessage.success("操作成功");
    } else {
        ElMessage.error("操作失败");
    }


    dialogFormVisible.value = false;

}

function addTradeMarkClick() {
    dialogFormVisible.value = true;
}


function handleSizeChange(value: number) {
    //value 当前size
    currentPage.value = 1;
    fetchTradeMarkList();

}

function handleCurrentChange(value: number) {
    //value 当前页
    fetchTradeMarkList();
}

function closeDialog() {
    formRef.value.clearValidate();
    tradeMarkForm.value = {
        tmName: '',
        logoUrl: '',
        id: 0,
    };
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