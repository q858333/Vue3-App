<template>
    <template v-for="(item) in menuList" :key="item.path">
        <!-- //判断是否有子菜单 -->
        <template v-if="!item.children && item.meta && !item.meta.hidden">
        <el-menu-item :index="item.path" >{{ item.meta.title }}</el-menu-item>
        </template>
        <!-- //判断是否有子菜单，但是子菜单只有一个 -->
        <template v-else-if="item.children && item.meta && item.children.length <= 1 && !item.meta.hidden">
            <el-menu-item :index="item.path" >{{ item.meta.title }}</el-menu-item>
        </template>
        <!-- //判断是否有子菜单，子菜单有多个 -->
        <template v-else-if="item.children && item.children.length > 1 && item.meta && !item.meta.hidden">
            <el-sub-menu :index="item.path" >
                <template #title>{{ item.meta.title }}</template>
                <Menu :menuList="item.children"></Menu>
            </el-sub-menu>  
        </template>

            
   </template>

</template>

<script setup lang="ts">
import Menu from "@/layout/menu/index.vue";

defineProps(['menuList']);


</script>

<style scoped lang="scss">


</style>