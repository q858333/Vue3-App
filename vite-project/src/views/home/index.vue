<template>
    <div>
     <h1>你好 {{useUser.username}}</h1>
    </div>
</template>

<script setup lang="ts">
import  useUserStore  from '@/store/modules/user';
import { onMounted } from 'vue';
let useUser = useUserStore();

onMounted(async () => {
    let result = await useUser.userInfo();
    if(result == "ok") {

        console.log("获取用户信息成功", useUser.username);
    }
});

</script>


<style scoped lang="scss">

</style>