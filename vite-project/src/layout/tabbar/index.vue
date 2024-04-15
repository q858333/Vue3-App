<template>
    <div class="tabbar">
        <div class="tabbar_left">
            <el-icon style="margin: 0 10px;">
                <Expand />
            </el-icon>
            <el-breadcrumb separator-icon="ArrowRight">
                <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
                <el-breadcrumb-item>management</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="tabbar_right">
            <el-button icon="Refresh" circle />
            <el-button icon="FullScreen" circle />
            <el-button icon="Setting" circle />
            <img src="../../../public/logo.png" style="width: 30px; height:30px;margin: 0 10px;" alt="">


            <el-dropdown @command="handleCommand">
                <span >
                    Dropdown List
                    <el-icon >
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="1">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>

        </div>

    </div>
</template>

<script setup lang="ts">

function handleCommand(command:string){
    console.log('handleCommand',command);
}

</script>

<style scoped lang="scss">
.tabbar {
    width: 100%;
    height: 100%;
    color: black;
    display: flex;
    justify-content: space-between;

    .tabbar_left {
        display: flex;
        align-items: center;
    }

    .tabbar_right {
        display: flex;
        align-items: center;
    }

}
</style>