<template>
    <div>
        <el-card style="height: 80px">
            <el-form :inline="true" class="form">
                <el-form-item label="用户名">
                    <el-input placeholder="请输入搜索职位关键字" v-model='searchText'></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="searchClick" :disabled="searchText ? false : true">搜索</el-button>
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
                        <el-button type="primary" size="small" icon="User"
                            @click="setPermissionClick(row)">分配权限</el-button>
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
        <!-- 更新职位/添加职位弹窗 -->
        <el-dialog v-model="showRoleEditDialog" :title="selectedRoleModel.id ? '更新职位' : '添加职位'" @closed="closeDialog">
            <el-form :model="selectedRoleModel" :rules="rules" ref="formRef">
                <el-form-item label="职位名称" prop="roleName">
                    <el-input placeholder="请输入职位名称" v-model='selectedRoleModel.roleName'></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <div>
                    <el-button @click="showRoleEditDialog = false">取消</el-button>
                    <el-button :disabled="selectedRoleModel.roleName.length > 0 ? false : true" type="primary"
                        @click="confirmClick">
                        确认
                    </el-button>
                </div>
            </template>

        </el-dialog>
        <!-- 权限管理抽屉 -->
        <el-drawer v-model="showDrawer" title="权限管理">
            <template #default>
                <el-tree ref="treeRef" style="max-width: 600px" :props="props" node-key="id" default-expand-all :data="permissionList" :default-checked-keys="selectedPermissionIdList" show-checkbox
                    @check-change="handleCheckChange" />
            </template>
            <template #footer>
                <div style="flex: auto">
                    <el-button @click="showRoleEditDialog=false">取消</el-button>
                    <el-button type="primary" @click="updatePermissionClick">确认</el-button>
                </div>
            </template>
        </el-drawer>

    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { reqRoleList, reqAddOrUpdateRole, reqRolePermission,reqSetPermission} from '@/api/acl/role'
import type { RoleListResponseData,RolePermissionResponseData,RolePermissionModel } from '@/api/acl/role/type'
import type { AclRoleModel } from "@/api/acl/user/type";
import { ElMessage } from 'element-plus';
import { cloneDeep, pull } from 'lodash';
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

///弹窗
let showRoleEditDialog = ref(false);
let selectedRoleModel = ref<AclRoleModel>({
    roleName: ''
})
let formRef = ref();
//表单规则
let rules = ref({
    roleName: [
        { required: true, trigger: 'blur', validator: checkRoleNameRule }
    ],
});
///抽屉
let treeRef=ref();
let showDrawer = ref(false);
const props = {
  label: 'name',
  children: 'children',
}
let permissionList = ref<RolePermissionModel[]>([]);
let selectedPermissionIdList = ref<number[]>([]);
onMounted(() => {
    fetchRoleList();
});

async function fetchRoleList(roleName = '') {

    let result: RoleListResponseData = await reqRoleList(currentPage.value, pageSize.value, roleName);
    if (result.code == 200) {
        roleList.value = result.data.records;
        total.value = result.data.total;
    } else {
        ElMessage.error('获取列表数据失败');
    }
}
///搜索
//搜索按钮
function searchClick() {
    currentPage.value = 1;
    fetchRoleList(searchText.value);

}
//重置按钮
function resetClick() {
    searchText.value = '';
    currentPage.value = 1;
    fetchRoleList();
}
///分页器
//翻页
function handleCurrentChange() {
    fetchRoleList();

}
//修改每页大小
function handleSizeChange() {
    fetchRoleList();
}
///添加职位
function addRoleClick() {
    selectedRoleModel.value = {
        roleName: ''
    }
    showRoleEditDialog.value = true;

}
/// 表格
//分配权限
async function setPermissionClick(row: AclRoleModel) {
    let result:RolePermissionResponseData = await reqRolePermission(row.id??0);
    permissionList.value = result.data;
    //筛选出被选中的权限
    selectedPermissionIdList.value =  filterSeletedPermission(result.data,[]);
   
    selectedRoleModel.value = cloneDeep(row);
    showDrawer.value = true;

}

function filterSeletedPermission (list:RolePermissionModel[],selectedList:number[]) {
    list.forEach((item)=>{
        if(item.children == null || item.children.length == 0){
            if(item.select) {
                selectedList.push(item.id);
            }
        } else {
            filterSeletedPermission(item.children,selectedList);
        }
    });
    return selectedList;
    
}
function editClick(row: AclRoleModel) {
    selectedRoleModel.value = cloneDeep(row);
    showRoleEditDialog.value = true;

}
function deleteClick(row: AclRoleModel) {
    selectedRoleModel.value = cloneDeep(row);

}


async function addOrUpdateRole(row: AclRoleModel) {
    let result = await reqAddOrUpdateRole(row);
    if (result.code == 200) {
        ElMessage.success(row.id ? '更新成功' : '添加成功');
        showRoleEditDialog.value = false;
        fetchRoleList();

    } else {
        ElMessage.error(row.id ? '更新失败' : '添加失败');
    }


}

///dialog
async function confirmClick() {
    try {
        await formRef.value.validate();
    } catch (e) {
        ElMessage.error("请完成信息填写");
        return;
    }

    addOrUpdateRole(selectedRoleModel.value);
}

function checkRoleNameRule(rule, value, callback) {
    if (value.length > 10) {
        callback(new Error('职位长度做多10位'));
    } else if (value.trim() == '') {
        callback(new Error('不能为空'));
    } else {
        callback();
    }

}
function closeDialog() {
    formRef.value.resetFields();
}
/// 抽屉
async function updatePermissionClick () {
    let selectedList = treeRef.value.getCheckedKeys();
    let result = await reqSetPermission(selectedRoleModel.value.id as number,selectedList);
    if(result.code == 200) {
        ElMessage.success('设置成功');
        showDrawer.value = false;
        window.location.reload();
    } else {
        ElMessage.error('设置失败');
    }

}

function handleCheckChange (  data: RolePermissionModel,
  checked: boolean,
  indeterminate: boolean) {
    if(checked) {
        selectedPermissionIdList.value.push(data.id);
    } else {
        pull(selectedPermissionIdList.value,data.id);
    }
    console.log(data,checked,indeterminate);

}

</script>

<style scoped>
.form {
    display: flex;
    justify-content: space-between;
}
</style>