<template>
    <router-view v-slot="{ Component }">

        <transition name="fade">
            <component :is="Component" />
        </transition>

    </router-view>
</template>

<script setup lang="ts" name="Content">

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
