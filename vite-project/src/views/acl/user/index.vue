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
            <el-button type="primary" @click="deleteMultClick">批量删除</el-button>
            <el-table border style="margin: 10px 0px;">
                <el-table-column align="center" type="selection" widht="50"></el-table-column>
                <el-table-column align="center" label="#" type="index"></el-table-column>
                <el-table-column align="center" label="ID" ></el-table-column>
                <el-table-column align="center" label="用户名字" ></el-table-column>
                <el-table-column align="center" label="用户名称" ></el-table-column>
                <el-table-column align="center" label="用户角色" ></el-table-column>
                <el-table-column align="center" label="创建时间" ></el-table-column>
                <el-table-column align="center" label="更新时间" ></el-table-column>
                <el-table-column align="center" label="操作" width="260"></el-table-column>
            </el-table>

            <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[10, 20, 30]"
            :background="true" layout="prev, pager, next ,->, total, sizes,jumper" :total="total"
            @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

//搜索内容
let searchText = ref('');
//当前页
let currentPage = ref(1);
//每页显示条数
let pageSize = ref(10);
//总条数
let total = ref(0);


///按钮点击
//重置
function resetClick() {
    searchText.value = '';
    console.log("resetClick");
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

///分页器
//每页显示条数改变
function handleSizeChange() {
    console.log("handleSizeChange");
}
//当前页改变
function handleCurrentChange() {
    console.log("handleCurrentChange");
}



</script>

<style scoped lang="scss">
.form {
    display: flex;
    justify-content: space-between;
}

</style>