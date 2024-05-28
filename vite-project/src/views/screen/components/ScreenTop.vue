
<template>
    <div class="top">
        <div class="left">
            <span class="lbtn" @click="goHome">首页</span>
        </div>
        <div class="center">
            <span class="title">智慧旅游可视化大数据平台</span>
        </div>
        <div class="right">
            <span class="rbtn">统计</span>
            <span class="time"> {{time}}</span>

        </div>
    </div>
</template>

<script setup lang="ts" name="ScreenTop">
import { useRouter } from 'vue-router';
//@ts-ignore
import moment from 'moment';
import {ref, onMounted,onBeforeUnmount} from 'vue'
let router = useRouter();
let time =ref('');
let timer = ref();
onBeforeUnmount(()=>{
    clearInterval(timer.value);
});
onMounted(()=>{
    timer.value = setInterval(() => {
         time.value = moment().format('YYYY年MM月DD日 HH:mm:ss')
         console.log(111111);
    }, 1000)
    console.log(timer);

});

function goHome () {
    router.push('/home');
}


</script>

<style scoped lang="scss">

.top {
    display: flex;
    width:100%;
    height:100%;
    .left{
        flex: 1;
        background: url('@/assets/images/screen/dataScreen-header-left-bg.png') no-repeat;
        background-size: 100% 100%;
        .lbtn{
            display: flex;
            float:right;
            background: url('@/assets/images/screen/dataScreen-header-btn-bg-l.png') no-repeat;
            background-size: 100% 100%;
            height: 40px;
            width: 150px;
            line-height: 40px;
            color: #29fcff;
            font-size: 20px;
            justify-content: center;
        }

    }
    .center{
        flex:2;
        background: url('@/assets/images/screen/dataScreen-header-center-bg.png') no-repeat;
        background-size: 100% 100%;
        height: 74px;
        text-align: center;
        .title{
            line-height: 74px;
            color: #29fcff;
            font-size: 30px;
        }
    }
    .right{
        flex:1;
        background: url('@/assets/images/screen/dataScreen-header-right-bg.png') no-repeat;
        background-size: 100% 100%;
        justify-content: space-between;
        align-items: center;
        display: flex;
        .rbtn{
            width: 150px;
            height: 40px;
            background: url('@/assets/images/screen/dataScreen-header-btn-bg-r.png') no-repeat;
            background-size: 100% 100%;
            line-height: 40px;
            text-align: center;
            font-size: 20px;
            color: #29fcff;
        }
        .time{
            font-size: 20px;
            color: #29fcff;
            margin-right: 10px;
        }
    }
}

</style>