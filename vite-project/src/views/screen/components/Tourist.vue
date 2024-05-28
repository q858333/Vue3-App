<template>
    <div class="bg">
        <div class="top">
            <p class="title">实施游客统计</p>
            <p class="titlebg"></p>
            <p class="desc">可容纳总量9999人</p>
        </div>
        <div class="number">
            <span v-for="item in totalPeople" class="numberbg">{{item}}</span>
        </div>
        <div class="charts" ref="chartsRef"></div>


    </div>
</template>

<script setup lang="ts" name="Tourist">
import {ref,onMounted} from 'vue'
import * as echarts from 'echarts';
import 'echarts-liquidfill'

let totalPeople = ref('23214人');
let chartsRef = ref();

onMounted(()=>{

    let charts = echarts.init(chartsRef.value);
    charts.setOption({
        title:{
            title:'统计'
        },
        series:{
            radius: '70%',
            type: 'liquidFill',
            data: [0.6],
        
           
        },
    })
});


</script>

<style scoped lang="scss">
.bg {
    background: url('@/assets/images/screen/dataScreen-main-lb.png') no-repeat;
    background-size: 100% 100%;

    .top {
        .title {
            color: white;
            font-size: 20px;

        }

        .titlebg {
            width: 68px;
            height: 7px;
            background: url('@/assets/images/screen/dataScreen-title.png') no-repeat;
            background-size: 100% 100%;
            margin-top: 10px;
        }
        .desc {
            color: white;
            font-size: 20px;
            text-align: right;
            margin-right: 20px;
        }

    }
    .number {
        display: flex;
        margin-top: 30px;
        padding: 0px 15px;
        .numberbg{
            flex: 1;
            height: 40px;
            background: url('@/assets/images/screen/total.png') no-repeat;
            background-size: 100% 100%;
            color: #29fcff;
            text-align: center;
            line-height: 40px;
        }
    }
    .charts {
        width: 100%;
        height: 250px;
    }

}
</style>