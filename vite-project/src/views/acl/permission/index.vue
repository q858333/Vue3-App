<template>
    <div>
        <el-table :data="list" style="width: 100%; margin-bottom: 20px" row-key="id" border>
            <el-table-column prop="name" label="名称" />
            <el-table-column prop="code" label="权限值" />
            <el-table-column prop="updateTime" label="修改时间" />
            <el-table-column label="操作">
                <template #default="{row}">
                    <el-button type="primary" @click="tableAddClick(row)" :disabled="row.level==4">{{row.level==3?'添加功能':'添加菜单'}} </el-button>
                    <el-button type="primary" @click="tableEditClick(row)" :disabled="row.level==1">编辑 </el-button>
                    <el-popconfirm title="Are you sure to delete?" icon="Delete" icon-color="red" width="250"
                            @confirm="tableDeleteClick(row)">
                            <template #reference>
                                <el-button type="danger" :disabled="row.level==1">删除</el-button>
                            </template>
                        </el-popconfirm>
                </template>

            </el-table-column>
        </el-table>
        <!-- 弹窗 -->
        <el-dialog v-model="showDialog" :title='selectedPermisstion.id?"更新菜单":"添加菜单"' @closed="closeDialog">
            <el-form label-width="100" :model="selectedPermisstion" :rules="rules" ref="formRef">
                <el-form-item label="名称" prop="name">
                    <el-input placeholder="请输入名称" v-model='selectedPermisstion.name'></el-input>
                </el-form-item>
                <el-form-item label="权限值" prop="code">
                    <el-input placeholder="请输入权限值" v-model='selectedPermisstion.code'></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <div>
                    <el-button @click="showDialog = false">取消</el-button>
                    <el-button  type="primary"
                        @click="confirmClick">
                        确认
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus';
import { ref, onMounted } from 'vue'
import type {PermissionListResponseData} from '@/api/acl/permission/type'
import type { RolePermissionModel } from '@/api/acl/role/type';
import {reqPermissionList,reqAddOrUpdatePermission,reqDeletePermission} from '@/api/acl/permission'
import { cloneDeep } from 'lodash';

let list = ref<RolePermissionModel[]>([]);
///弹窗
let showDialog = ref(false);
let selectedPermisstion = ref<RolePermissionModel>({
    name:'',
    code:'',
});
let formRef = ref();
//表单校验
let rules = ref({
    name: [
        { required: true, trigger: 'blur', validator: checkNameRule }
    ],
    code:[
        { required: true, trigger: 'blur', validator: checkCodeRule }
    ]
});

onMounted(()=>{
    fetchPermissionList();
});

async function fetchPermissionList () {
    let result:PermissionListResponseData = await reqPermissionList();
    if(result.code == 200) {
        list.value = result.data;
    } else {
        ElMessage.error('获取失败');
    }
}


///table
//添加菜单按钮
function tableAddClick (row:RolePermissionModel) {
    selectedPermisstion.value = {
        name:'',
        code:'',
        pid:row.id,
    }
    showDialog.value = true;
}
//编辑按钮
function tableEditClick (row:RolePermissionModel) {
    selectedPermisstion.value = cloneDeep(row);
    showDialog.value = true;

}
//删除按钮
async function tableDeleteClick (row:RolePermissionModel) {
    let result = await reqDeletePermission(row.id??0);
    if(result.code == 200) {
        ElMessage.success('删除成功');
        fetchPermissionList();
    } else {
        ElMessage.error('删除失败');
    }

}
///弹窗
function closeDialog () {
    formRef.value.resetFields();
}
async function confirmClick () {
    try {
        await formRef.value.validate();
    } catch (e) {
        ElMessage.error("请完成填写");
        return;
    }

    let result = await reqAddOrUpdatePermission(selectedPermisstion.value);
    if(result.code == 200) {
        ElMessage.success(selectedPermisstion.value.id ? '更新成功':'添加成功')
        showDialog.value = false;
        fetchPermissionList();
    } else {
        ElMessage.error(selectedPermisstion.value.id ? '更新失败':'添加失败')
    }
}
function checkNameRule(rule, value, callback) {
    if (value.length > 10) {
        callback(new Error('名称不能超过10位'));
    } else if (value.trim() == '') {
        callback(new Error('名称不能为空'));
    } else {
        callback();
    }
}
function checkCodeRule(rule, value, callback) {
    if (value.length > 10) {
        callback(new Error('权限值不能超过20位'));
    } else if (value.trim() == '') {
        callback(new Error('权限值不能为空'));
    } else {
        callback();
    }
}

</script>

<style scoped></style>