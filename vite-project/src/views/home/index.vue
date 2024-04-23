<template>
    <div>
     <h1>你好 {{useUser.username}}</h1>
    </div>
</template>

<script setup lang="ts">
import  useUserStore  from '@/store/modules/user';
import { onMounted } from 'vue';
import pinia from '@/store';
let useUser = useUserStore(pinia);

onMounted(async () => {
    
});

</script>


<style scoped lang="scss">

</style>