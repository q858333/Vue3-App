<template>
    <div>
        <div class="layout-menu">
            <Logo></Logo>
            <el-scrollbar class="scrollbar">
                    <el-menu background-color="#001529" text-color="white" :default-active="$useRoute.path" >
                        <Menu :menuList="useUser.menuRoutes"></Menu>
                    </el-menu>
            </el-scrollbar>

        </div>
        <div class="layout-tabbar">
            <Tabbar></Tabbar>
        </div>
        <div class="layout-content">
            <Content></Content>
        </div>

    </div>
</template>

<script setup lang="ts">
import Logo from "@/layout/logo/index.vue";
import Menu from "@/layout/menu/index.vue";
import useUserStore from "@/store/modules/user";
import Tabbar from "@/layout/tabbar/index.vue";
import Content from "@/layout/content/index.vue";
import { useRoute } from "vue-router";
let useUser = useUserStore();

let $useRoute = useRoute();
</script>
<style lang="scss" scoped>
.layout-menu {
    background-color: black;
    width: $base-menu-width;
    height: 100vh;

    .scrollbar {
        width: 100%;
        height: calc(100vh - $base-menu-logo-height);
        .el-menu-item {
            display: grid;
            width: 100%;
        }
    }
}

.layout-tabbar {
    position: fixed;
    background-color: white;
    left: $base-menu-width;
    top: 0;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    border-bottom: 1px solid black;

}

.layout-content {
    position: absolute;
    top: $base-tabbar-height;
    left: $base-menu-width;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    overflow: auto;
    padding: 20px;
}
</style>