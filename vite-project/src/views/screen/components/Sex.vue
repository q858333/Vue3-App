<template>
    <div class="sexbg">
        <div class="titlebox">
            <p class="title">男女比例</p>
            <p class="titlebg"></p>
        </div>
        <div class="sexicon">
            <div class="man">
                <p>男士</p>
                <img style="margin: 20px 0px;" src="@/assets/images/screen/man.png" alt="">

            </div>
            <div class="woman">
                <p>女士</p>
                <img style="margin: 20px 0px;" src="@/assets/images/screen/woman.png" alt="">
            </div>
        </div>
        <div class="ratio">
            <span>男士60%</span>
            <span>女士40%</span>
        </div>
        <div class="charts" ref="chartsRef"></div>

    </div>
</template>

<script setup lang="ts" name="Sex">
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';

let chartsRef = ref();

onMounted(() => {
    let charts = echarts.init(chartsRef.value);
    charts.setOption({
        title: {
            title: '统计'
        },
        xAxis: {
           show:false,
           min: 0,
           max: 100,
        },
        yAxis: {
            show:false,
            type: 'category'

        },
        series: [
            {
                type: 'bar',
                data: [40],
                barWidth: '20%',
                stack: 'y',
                itemStyle:{
                    color:"blue",
                }
            },
            {
                type: 'bar',
                data: [60],
                barWidth: '20%',
                stack: 'y',
                itemStyle:{
                    color:"pink",
                }
                

            }
        ],
    })

})

</script>

<style scoped lang="scss">
.sexbg {
    background: url('@/assets/images/screen/dataScreen-main-lb.png') no-repeat;
    background-size: 100% 100%;
    margin: 20px 0px;

    .charts {
        width: 100%;
        height: 60px;
    }

    .ratio {
        padding-left: 50px;
        padding-right: 50px;
        width: 100%;
        color: white;
        display: flex;
        justify-content: space-between;

    }

    .titlebox {

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

    }

    .sexicon {
        display: flex;
        justify-content: space-evenly;
        margin-top: 60px;

        .man {
            color: white;
            width: 111px;
            height: 115px;
            background: url('@/assets/images/screen/man-bg.png') no-repeat;
            text-align: center;

        }

        .woman {
            color: white;
            width: 111px;
            height: 115px;
            background: url('@/assets/images/screen/woman-bg.png') no-repeat;
            text-align: center;

        }
    }






}
</style>