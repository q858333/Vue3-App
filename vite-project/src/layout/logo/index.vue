<template>
    <div class="logo">
    <img :src="gsetting.logo" alt="" />
    <p>{{gsetting.title}}</p>
    </div>
</template>

<script setup lang="ts" name="Logo">

import gsetting from "@/gsetting";

</script>

<style scoped lang="scss"> 
.logo{
    width: 100%;
    height: $base-menu-logo-height;
    padding: 40px 10px;
    align-items: center;
    display: flex;

    img{
        width: 40px;
        height: 40px;
    }
    
    p{
        color: white;
        margin: 10px;
        white-space: nowrap;
    }
}
</style>