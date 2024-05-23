<template>
    <div>
        <el-table :data="list" style="width: 100%; margin-bottom: 20px" row-key="id" border>
            <el-table-column prop="name" label="名称" />
            <el-table-column prop="code" label="权限值" />
            <el-table-column prop="updateTime" label="修改时间" />
            <el-table-column label="操作">
                <template #default="{row}">
                    <el-button type="primary" @click="tableAddClick(row)" :disabled="row.children.length==0">{{row.level==3?'添加功能':'添加菜单'}} </el-button>
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
    </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus';
import { ref, onMounted } from 'vue'
import type {PermissionListResponseData} from '@/api/acl/permission/type'
import type { RolePermissionModel } from '@/api/acl/role/type';
import {reqPermissionList} from '@/api/acl/permission'

let list = ref<RolePermissionModel[]>([]);

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
function tableAddClick (row:any) {

}
//编辑按钮
function tableEditClick (row:any) {

}
//删除按钮
function tableDeleteClick (row:any) {

}

</script>

<style scoped></style>