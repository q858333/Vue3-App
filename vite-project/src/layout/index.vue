<template>
    <div>
        <div class="layout-menu">
        <logo></logo>
        </div>
        <div class="layout-nav">顶部导航</div>
        <div class="layout-content">

<p style="background-color: red;height: 10000px;">1231231232131</p>

        </div>

    </div>
</template>

<script setup lang="ts">
import logo from "@/layout/logo/index.vue"
</script>

<style lang="scss" scoped>
.layout-menu {
    background-color: black;
    width: $base-menu-width;
    height: 100vh;
}
.layout-nav {
    position: fixed;
    background-color: white;
    left: $base-menu-width;
    top:0;
    width: calc(100% - $base-menu-width);
    height: $base-nav-height;
    border-bottom: 1px solid black;

}
.layout-content{
    position: absolute;
    top:$base-nav-height;
    left:$base-menu-width;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-nav-height);
    overflow: auto;
    padding: 20px;
}
</style>