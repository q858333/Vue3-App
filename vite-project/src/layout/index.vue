<template>
    <div>
        <div class="layout-menu">
            <Logo></Logo>
            <el-scrollbar class="scrollbar">
                    <el-menu background-color="#001529" text-color="white">
                        <Menu :menuList="useUser.menuRoutes"></Menu>
                    </el-menu>

            </el-scrollbar>

        </div>
        <div class="layout-nav">顶部导航</div>
        <div class="layout-content">
            <p style="background-color: red;height: 10000px;">1231231232131</p>
        </div>

    </div>
</template>

<script setup lang="ts">
import Logo from "@/layout/logo/index.vue";
import Menu from "@/layout/menu/index.vue";
// import { useRouter} from "vue-router";
import useUserStore from "@/store/modules/user";
// import menu from "@/layout/menu/index.vue";

let useUser = useUserStore();
// let router = useRouter();
// let routes: RouteRecordRaw[] = router.getRoutes();

console.log("list,",useUser.menuRoutes);
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

.layout-nav {
    position: fixed;
    background-color: white;
    left: $base-menu-width;
    top: 0;
    width: calc(100% - $base-menu-width);
    height: $base-nav-height;
    border-bottom: 1px solid black;

}

.layout-content {
    position: absolute;
    top: $base-nav-height;
    left: $base-menu-width;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-nav-height);
    overflow: auto;
    padding: 20px;
}
</style>