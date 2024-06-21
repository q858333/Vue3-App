
<template>
    <div class="counterbg">
        <div class="titlebox">
            <p class="title">年龄比例</p>
            <p class="titlebg"></p>
        </div>
        <div class="charts" ref="chartsRef">

        </div>

    </div>
</template>

<script setup lang="ts" name="Counter">
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
            show: false,
            min: 0,
            max: 100,
        },
        yAxis: {
            show: false,
            type: 'category'

        },
        series: [
            {
                type: 'bar',
                data: [40],
                barWidth: '20%',
                stack: 'y',
                itemStyle: {
                    color: "blue",
                }
            },
            {
                type: 'bar',
                data: [60],
                barWidth: '20%',
                stack: 'y',
                itemStyle: {
                    color: "pink",
                }
            }
        ],
    })

})

</script>

<style lang="scss" scoped>
.counterbg{
    background: url('@/assets/images/screen/dataScreen-main-lb.png') no-repeat;
    background-size: 100% 100%;

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

    .charts {
        height: 75%;
        margin-top: 15px;

    }

}
</style>