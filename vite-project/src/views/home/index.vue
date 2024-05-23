<template>
    <div>
       <el-card>
            <div class="box">
                <img class="avatar" :src="useUser.avatar" alt="">
                <div style="align-content: center;margin-left: 10px;">
                    <h3 class="title">{{time}}好 {{useUser.username}}</h3>
                    <p class="subtitle">运营平台</p>
                </div>
            </div>
       </el-card>
       
       <SvgIcon class="svg" name="welcome" width="500px" height="300px"></SvgIcon>
    </div>
</template>

<script setup lang="ts">

import  useUserStore  from '@/store/modules/user';
import { onMounted } from 'vue';
import {getTime} from '@/utils/time'
import pinia from '@/store';
import SvgIcon from '@/components/SvgIcon.vue';

let useUser = useUserStore(pinia);
let time = getTime();

onMounted(async () => {
    
});

</script>


<style scoped lang="scss">
.box {
    display: flex;
    .avatar {
        width: 100px;
        height: 100px;
        border-radius: 50%;
    }
    .title {
        font-size: 30px;
        margin-bottom: 10px;
    }
    .subtitle {
        font-style: italic;
        color: rgb(56, 53, 53);
    }
}
.svg {
    display: flex;
    justify-content: center;
    margin-top: 30px;
}
</style>