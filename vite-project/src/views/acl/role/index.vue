<template>
    <div>
        <el-card style="height: 80px">
            <el-form :inline="true" class="form">
                <el-form-item label="用户名">
                    <el-input placeholder="请输入搜索职位关键字" v-model='searchText'></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="searchClick" :disabled="searchText?false:true">搜索</el-button>
                    <el-button type="primary" @click="resetClick">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card style="margin: 10px 0px;">
            <el-button type="primary" @click="addRoleClick">添加职位</el-button>
            <el-table border style="margin: 10px 0px;" :data="roleList">
                <el-table-column label="#" type="index" align="center" width="50"></el-table-column>
                <el-table-column label="ID" align="center" width="150" prop="id"></el-table-column>
                <el-table-column label="职位名称" align="center" prop="roleName" show-overflow-tooltip></el-table-column>
                <el-table-column label="创建时间" align="center" prop="createTime" show-overflow-tooltip></el-table-column>
                <el-table-column label="更新时间" align="center" prop="updateTime" show-overflow-tooltip></el-table-column>
                <el-table-column label="操作" align="center">
                    <template #default="{ row }">
                        <el-button type="primary" size="small" icon="User" @click="setPrivilegeClick(row)">分配权限</el-button>
                        <el-button type="primary" size="small" icon="Edit" @click="editClick(row)">编辑</el-button>
                        <el-popconfirm title="Are you sure to delete?" icon="Delete" icon-color="red" width="250"
                            @confirm=deleteClick(row)>
                            <template #reference>
                                <el-button type="danger" icon="Delete" size="small">删除</el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>

            </el-table>
            <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[10, 20, 30]"
                :background="true" layout="prev, pager, next ,->, total, sizes,jumper" :total="total"
                @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </el-card>
    </div>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue';
import {reqRoleList} from '@/api/acl/role'
import type {RoleListResponseData} from '@/api/acl/role/type'
import type { AclRoleModel } from "@/api/user/type";
import { ElMessage } from 'element-plus';
//搜索内容
let searchText = ref('');
//当前页
let currentPage = ref(1);
//每页多少条
let pageSize = ref(10);
//总条数
let total = ref(0);
//列表数据
let roleList = ref<AclRoleModel[]>([]);


onMounted(()=>{
    fetchRoleList();
});

async function fetchRoleList(roleName='') {

    let result:RoleListResponseData = await reqRoleList(currentPage.value,pageSize.value,roleName);
    if(result.code == 200) {
        roleList.value = result.data.records;
        total.value = result.data.total;
    } else {
        ElMessage.error('获取列表数据失败');
    }
}
///搜索
//搜索按钮
function searchClick () {
    currentPage.value = 1;
    fetchRoleList(searchText.value);

}
//重置按钮
function resetClick () {
    searchText.value = '';
    currentPage.value = 1;
    fetchRoleList();
}
///分页器
//翻页
function handleCurrentChange () {

}
//修改每页大小
function handleSizeChange () {

}
///添加职位
function addRoleClick () {
    
}
/// 表格
//分配权限
function setPrivilegeClick (row:AclRoleModel){

}
function editClick (row:AclRoleModel) {

}
function deleteClick (row:AclRoleModel) {

}

</script>

<style scoped>
.form {
    display: flex;
    justify-content: space-between;
}
</style>