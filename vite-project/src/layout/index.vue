<template>
    <div>
        <div class="layout-menu" :class="{fold:useSetting.isfold}">
            <Logo></Logo>
            <el-scrollbar class="scrollbar">
                    <el-menu background-color="#001529" text-color="white" :default-active="$useRoute.path" :collapse="useSetting.isfold">
                        <Menu :menuList="useUser.menuRoutes"></Menu>
                    </el-menu>
            </el-scrollbar>

        </div>
        <div class="layout-tabbar" :class="{fold:useSetting.isfold}">
            <Tabbar></Tabbar>
        </div>
        <div class="layout-content" :class="{fold:useSetting.isfold}" >
            <Content></Content>
        </div>

    </div>
</template>

<script setup lang="ts" name="Layout">
import Logo from "@/layout/logo/index.vue";
import Menu from "@/layout/menu/index.vue";
import useUserStore from "@/store/modules/user";
import Tabbar from "@/layout/tabbar/index.vue";
import Content from "@/layout/content/index.vue";
import { useRoute } from "vue-router";

import useAppSetting from "@/store/modules/appSetting";

let useSetting = useAppSetting();

let useUser = useUserStore();

let $useRoute = useRoute();
</script>
<style lang="scss" scoped>
.layout-menu {
    background-color: black;
    width: $base-menu-width;
    height: 100vh;
    transition: all 0.2s;

    .scrollbar {
        width: 100%;
        height: calc(100vh - $base-menu-logo-height);
        .el-menu-item {
            display: grid;
            width: 100%;
        }
    }

    &.fold {
        width: $base-menu-min-width;
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
    transition: all 0.2s;
    &.fold {
        width: calc(100% - $base-menu-min-width);
        left: $base-menu-min-width;
    }

}

.layout-content {
    position: absolute;
    top: $base-tabbar-height;
    left: $base-menu-width;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    overflow: auto;
    padding: 20px;
    transition: all 0.2s;

    &.fold {
        width: calc(100% - $base-menu-min-width);
        left: $base-menu-min-width;
    }
}
</style>