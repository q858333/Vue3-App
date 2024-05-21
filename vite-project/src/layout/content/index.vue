<template>
    <router-view v-slot="{ Component,route }">
        <transition name="fade">
            <component :is="Component" :key="route.path"  v-if="flag"/>
        </transition>

    </router-view>
</template>

<script setup lang="ts" name="Content">
import useAppSetting from '@/store/modules/appSetting';
import {ref,watch,nextTick} from 'vue'
let appSettingStore = useAppSetting();

let flag = ref(true);
watch(() => appSettingStore.refsh, () => {
    //点击刷新按钮:路由组件销毁
    flag.value = false;
    nextTick(() => {
        flag.value = true;
    })
})

</script>

<style lang="scss" scoped>
.fade-enter-from {
    opacity: 0;
    scale: 0;
}

.fade-enter-to {
    opacity: 1;
    scale: 1;
}

.fade-enter-active {
    transition: all 0.5s;
}
</style>
