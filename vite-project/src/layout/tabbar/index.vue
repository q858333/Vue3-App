<template>
    <div class="tabbar">
        <div class="tabbar_left">
            <el-icon style="margin: 0 10px;" @click="changeFoldStatus">
                <component :is="useSetting.isFold?'Fold':'Expand'"></component>
            </el-icon>
            <el-breadcrumb separator-icon="ArrowRight">
                <el-breadcrumb-item v-for="(item, index) in $useRoute.matched" :key="index" v-show="item.meta.title"
                    :to="{ path: item.path }">
                    <el-icon>
                        <component :is="item.meta.icon"></component>
                    </el-icon>
                    {{ item.meta.title }}
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="tabbar_right">
            <el-button icon="Refresh" circle @click="refreshClick" />
            <el-button icon="FullScreen" circle @click="fullScreenClick" />
            <el-popover placement="bottom" title="主题设置" width="200" trigger="click">
                <el-form>
                    <el-form-item label="主题设置">
                            <el-color-picker v-model="color" @change="colorChange"/>
                    </el-form-item>
                    <el-form-item label="暗黑模式">
                        <el-switch v-model="isDark" inline-prompt @change="darkChange"
                            active-icon="Moon" inactive-icon="Sunny" />

                    </el-form-item>
                </el-form>
                <template #reference>
                    <el-button icon="Setting" circle />
                </template>
            </el-popover>



            <img :src="useUser.avatar" style="width: 30px; height:30px;margin: 0 10px;border-radius: 50%;" alt="">
            <el-dropdown @command="handleCommand">
                <span>
                    {{ useUser.username ?? "" }}<el-icon> <arrow-down /></el-icon>
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

<script setup lang="ts" name="Tabbar">

import useAppSetting from "@/store/modules/appSetting";
import useUserStore from "@/store/modules/user";
import { useRoute, useRouter } from "vue-router";
import pinia from "@/store";
import {ref} from 'vue'
let useSetting = useAppSetting();
let useUser = useUserStore(pinia);

let $useRoute = useRoute();
let $useRouter = useRouter();

//暗黑模式
let isDark = ref(false);

console.log('$useRoute', $useRoute);

//颜色选择
const color = ref('rgba(255, 69, 0, 0.68)')




function changeFoldStatus() {
    useSetting.isFold = !useSetting.isFold;

}

function handleCommand(command: string) {
    console.log('handleCommand', command);
    if (command == "1") {
        //退出登录
        console.log("logout");
        useUser.userLogout();
        $useRouter.push({ path: '/login', query: { redirect: $useRoute.path } });
    }
}

function fullScreenClick() {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        document.documentElement.requestFullscreen();
    }
}

function refreshClick() {
    useSetting.refresh = !useSetting.refresh;

}

function darkChange(val:boolean) {
    console.log('darkChange',val);
    let html = document.documentElement;
     html.className = (val == true ? 'dark':'');

}
function colorChange () {
    let html = document.documentElement;
    html.style.setProperty('--el-color-primary',color.value);

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