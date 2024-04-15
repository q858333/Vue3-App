<template>
    <template v-for="(item) in menuList" :key="item.path">
        <!-- //判断是否有子菜单 -->
        <template v-if="!item.children && item.meta && !item.meta.hidden">
        <el-menu-item :index="item.path" @click="goRoute">
                    <el-icon>
                        <component :is="item.meta.icon"></component>
                    </el-icon>
                    <template #title>
                        <span>{{ item.meta.title }}</span>
                    </template>
                    
        </el-menu-item>
        </template>
        <!-- //判断是否有子菜单，但是子菜单只有一个 -->
        <template v-else-if="item.children && item.meta && item.children.length == 1 && !item.meta.hidden">
            <el-menu-item :index="item.path" @click="goRoute">
                <el-icon>
                    <component :is="item.children[0].meta.icon"></component>
                </el-icon>
                <template #title>
                    <span>
                        {{ item.children[0].meta.title }}
                    </span>
                </template>
                    
                </el-menu-item>
        </template>
        <!-- //判断是否有子菜单，子菜单有多个 -->
        <template v-else-if="item.children && item.children.length > 1 && item.meta && !item.meta.hidden">
            <el-sub-menu :index="item.path" >
                <template #title>
                    <el-icon>
                        <component :is="item.meta.icon"></component>
                    </el-icon>
                    <span>
                        {{ item.meta.title }}
                    </span>
                </template>
                <Menu :menuList="item.children"></Menu>
            </el-sub-menu>  
        </template>

            
   </template>

</template>

<script setup lang="ts" name="Menu">

import Menu from "@/layout/menu/index.vue";
import { useRouter } from "vue-router";

defineProps(['menuList']);


let usrRouter = useRouter();
function goRoute(item: any) {
    usrRouter.push(item.index);
}


</script>

<style scoped lang="scss">


</style>