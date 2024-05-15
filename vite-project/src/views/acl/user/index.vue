<template>
    <div>
        <el-card style="height: 80px" >
            <el-form :inline="true" class="form"> 
                <el-form-item label="用户名">
                    <el-input placeholder="请输入搜索角色名"  v-model='searchText'></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="searchClick">搜索</el-button>
                    <el-button type="primary" @click="resetClick">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>

        <el-card style="margin: 10px 0px;">
            <el-button type="primary" @click="addUserClick">添加用户</el-button>
            <el-button type="danger" @click="deleteMultClick">批量删除</el-button>
            <el-table border style="margin: 10px 0px;" :data="userList">
                <el-table-column align="center" type="selection" widht="50"></el-table-column>
                <el-table-column align="center" label="#" type="index"></el-table-column>
                <el-table-column align="center" label="ID" prop="id"></el-table-column>
                <el-table-column align="center" label="用户名字" prop="name"></el-table-column>
                <el-table-column align="center" label="用户名称" prop="username"></el-table-column>
                <el-table-column align="center" label="用户角色" show-overflow-tooltip prop="roleName"></el-table-column>
                <el-table-column align="center" label="创建时间" show-overflow-tooltip prop="createTime"></el-table-column>
                <el-table-column align="center" label="更新时间" show-overflow-tooltip prop="updateTime"></el-table-column>
                <el-table-column align="center" label="操作" width="300">
                    <template #default="{row}">
                        <el-button type="primary" size="small" icon="User" @click="setRoleClick(row)">分配角色</el-button>
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
import { ref,onMounted } from 'vue'
import { ElMessage } from 'element-plus'

import { reqAclUserList } from '@/api/acl/user'
import type { AclUserListResponseData,AclUserModel } from '@/api/acl/user/type';
//搜索内容
let searchText = ref('');
//当前页
let currentPage = ref(1);
//每页显示条数
let pageSize = ref(10);
//总条数
let total = ref(0);

let userList = ref<AclUserModel[]>([]);

onMounted(()=>{
    fetchUserList();

});

async function fetchUserList () {
  let result:AclUserListResponseData =  await reqAclUserList(currentPage.value,pageSize.value);
  if(result.code === 200) {
    userList.value = result.data.records;
    total.value = result.data.total;
  } else {
    ElMessage.error('获取用户列表失败');
  }

}

///按钮点击
//重置
function resetClick() {
    searchText.value = '';
    pageSize.value = 1;
    fetchUserList();
}
//搜索
function searchClick() {
    console.log("searchClick");
}   
//添加用户
function addUserClick() {

}
//批量删除
function deleteMultClick() {

}

///表格操作
//分配角色
function setRoleClick(row:AclUserModel) {
    console.log("setRoleClick",row);
}
//编辑
function editClick(row:AclUserModel) {
    console.log("editClick",row);
}
//删除
function deleteClick(row:AclUserModel) {
    console.log("deleteClick",row);
}

///分页器
//每页显示条数改变
function handleSizeChange() {
    pageSize.value = 1;
    fetchUserList();
}
//当前页改变
function handleCurrentChange() {
    fetchUserList();
}



</script>

<style scoped lang="scss">
.form {
    display: flex;
    justify-content: space-between;
}

</style>