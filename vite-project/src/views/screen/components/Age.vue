<template>
    <div class="agebg">
        <div class="titlebox">
            <p class="title">年龄比例</p>
            <p class="titlebg"></p>
        </div>
        <div class="charts" ref="chartsRef">

        </div>

    </div>
</template>

<script setup lang="ts" name="Age">
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';

let chartsRef = ref();
onMounted(() => {
    let charts = echarts.init(chartsRef.value);
    let option = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: 'center',
            right: '10',
            orient:'vertical',
            textStyle:{
                color:'white',
            }

        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: true,
                    position: 'inside'
                },
                labelLine: {
                    show: false
                },
                data: [
                    { value: 1048, name: '18岁' },
                    { value: 735, name: '24岁' },
                    { value: 580, name: '6岁' },
                    { value: 484, name: '30岁' },
                    { value: 300, name: '45岁' }
                ]
            }
        ]
    };
    charts.setOption(option);

});

</script>

<style scoped lang="scss">
.agebg {
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