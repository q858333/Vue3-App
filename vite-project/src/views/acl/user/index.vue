<template>
    <div>
        <el-card style="height: 80px">
            <el-form :inline="true" class="form">
                <el-form-item label="用户名">
                    <el-input placeholder="请输入搜索角色名" v-model='searchText'></el-input>
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
                <el-table-column align="center" label="用户名" prop="username"></el-table-column>
                <el-table-column align="center" label="用户昵称" prop="name"></el-table-column>
                <el-table-column align="center" label="用户角色" show-overflow-tooltip prop="roleName"></el-table-column>
                <el-table-column align="center" label="创建时间" show-overflow-tooltip prop="createTime"></el-table-column>
                <el-table-column align="center" label="更新时间" show-overflow-tooltip prop="updateTime"></el-table-column>
                <el-table-column align="center" label="操作" width="300">
                    <template #default="{ row }">
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

        <!-- 用户信息抽屉 -->
        <el-drawer v-model="showUserUpdateDrawer" :title="currentUserModel.id ? '修改用户' : '添加用户'" @closed="closeDrawer">
            <el-form ref="formRef" label-width="100" :model="currentUserModel" :rules="formRules">
                <el-form-item label="用户名" prop="username">
                    <el-input placeholder="请输入用户名" minlength="5" show-word-limit
                        v-model="currentUserModel.username"></el-input>
                </el-form-item>
                <el-form-item label="用户昵称" prop="name">
                    <el-input placeholder="请输入用户昵称" v-model="currentUserModel.name"></el-input>
                </el-form-item>
                <el-form-item v-show="!currentUserModel.id" label="用户密码" prop="password">
                    <el-input placeholder="请输入用户密码" show-password show-word-limit minlength="6"
                        v-model="currentUserModel.password"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <div>
                    <el-button type="primary" @click="drawerSubmitClick">确定</el-button>
                    <el-button @click="drawerCancelClick">取消</el-button>
                </div>
            </template>
        </el-drawer>

        <!-- 分配角色抽屉 -->
        <el-drawer v-model="showSetRoleDrawer" title="分配角色" @closed="closeDrawer">
            <el-form>
                <!-- 用户名 -->
                <el-form-item label="用户名">
                    <el-input v-model="currentUserModel.username" disabled></el-input>
                </el-form-item>
                <!-- 分配角色 -->
                <el-form-item label="分配角色">
                    <el-checkbox v-model="isCheckAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">
                        Check all
                    </el-checkbox>
                    <!-- v-model="checkedCities" " -->
                    <el-checkbox-group @change="handleCheckedChange" v-model="userRoleList">
                        <el-checkbox v-for="(item) in allRoleList" :key="item" :value="item">
                            {{ item.roleName }}
                        </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>


            </el-form>


            <template #footer>
                <div>
                    <el-button type="primary" @click="rolesubmitClick">确定</el-button>
                    <el-button @click="drawerCancelClick">取消</el-button>
                </div>
            </template>
        </el-drawer>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { cloneDeep } from 'lodash';

import { reqAclUserList, reqAddOrUpdateUser, reqSetUserRole, reqUserRoleList } from '@/api/acl/user'
import type { AclRoleModel, AclUserListResponseData, AclUserModel, AclUserRoleListResponseData,SetRoleForm } from '@/api/acl/user/type';

//是否展示用户数据更新抽屉
let showUserUpdateDrawer = ref(false);

//搜索内容
let searchText = ref('');
//当前页
let currentPage = ref(1);
//每页显示条数
let pageSize = ref(10);
//总条数
let total = ref(0);

let userList = ref<AclUserModel[]>([]);



///用户信息抽屉数据
let formRef = ref();
let currentUserModel = ref<AclUserModel>({
    username: '',
    password: '',
    name: ''
});

///分配角色抽屉数据
//是否全选
let isCheckAll = ref(false);
let isIndeterminate = ref(true);
let showSetRoleDrawer = ref(false);
let allRoleList = ref<AclRoleModel[]>([]);
let userRoleList = ref<AclRoleModel[]>([]);

onMounted(() => {
    fetchUserList();

});


async function fetchUserList() {
    let result: AclUserListResponseData = await reqAclUserList(currentPage.value, pageSize.value);
    if (result.code === 200) {
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
    showUserUpdateDrawer.value = true;

}
//批量删除
function deleteMultClick() {

}

///表格操作
//分配角色
async function setRoleClick(row: AclUserModel) {
    let result:AclUserRoleListResponseData = await reqUserRoleList(row.id as number);
    if(result.code == 200) {
        currentUserModel.value = cloneDeep(row);
        showSetRoleDrawer.value = true;
        allRoleList.value = result.data.allRolesList;
        userRoleList.value = result.data.assignRoles;
        
    } else {
        ElMessage.error('获取失败');
    }
}
//编辑
 function editClick(row: AclUserModel) {
    currentUserModel.value = cloneDeep(row);
    showUserUpdateDrawer.value = true;

}
//删除
function deleteClick(row: AclUserModel) {
    console.log("deleteClick", row);
}

///抽屉操作
//抽屉确定
async function drawerSubmitClick() {
    try {
        await formRef.value.validate();
    } catch (e) {
        ElMessage.error("请完成信息填写");
        return;
    }

    let result = await reqAddOrUpdateUser(currentUserModel.value);
    if (result.code === 200) {
        ElMessage.success('操作成功');
        showUserUpdateDrawer.value = false;
        if (currentUserModel.value.id != 0) {
            //刷新网页 防止用户修改自己的账号信息
            window.location.reload();
        } else {
            fetchUserList();

        }
    } else {
        ElMessage.error('操作失败');
    }

}
//抽屉取消
function drawerCancelClick() {
    showSetRoleDrawer.value = false;
    showUserUpdateDrawer.value = false;
}

function closeDrawer() {
    if(formRef && formRef.value) {
        formRef.value.resetFields();
    }
    currentUserModel.value = {
        id: 0,
        username: '',
        password: '',
        name: ''
    };
}

async function rolesubmitClick() {
    let userIdList:number[] = userRoleList.value.map((item)=>{
        return item.id??0;
    })

    let requestData:SetRoleForm = {
        userId:currentUserModel.value.id??0,
        roleIdList:userIdList
    }
    let result = await reqSetUserRole(requestData);
    if(result.code == 200) {
        ElMessage.success('设置成功');
        showSetRoleDrawer.value = false;
        fetchUserList();
    } else {
        ElMessage.error('设置失败');
    }

    console.log("rolesubmitClick");
}

//全选变化
function handleCheckAllChange (isAll:boolean) {
    userRoleList.value = (isAll ? allRoleList.value : []);
    isIndeterminate.value = false;
}

//选项变化
function handleCheckedChange (valueList:string[]) {

    let isAll = (valueList.length === allRoleList.value.length);
    isCheckAll.value = isAll;
    isIndeterminate.value = !isAll;
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


//表单规则
let formRules = ref({
    username: [
        { required: true, trigger: 'blur', validator: checkNameRule }
    ],
    name: [
        { required: true, trigger: 'blur', validator: checkNameRule },
    ],
    password: [
        { required: true, trigger: 'blur', validator: checkPasswordRule },
    ]
});

function checkNameRule(rule, value, callback) {
    if (value.length < 5) {
        callback(new Error('用户名长度至少5位'));
    } else if (value.trim() == '') {
        callback(new Error('不能为空'));
    } else {
        callback();
    }
}

function checkPasswordRule(rule, value, callback) {
    if (value.length < 6) {
        callback(new Error('密码长度至少6位'));
    } else if (value.trim() == '') {
        callback(new Error('密码不能为空'));
    } else {
        callback();
    }
}




</script>

<style scoped lang="scss">
.form {
    display: flex;
    justify-content: space-between;
}
</style>