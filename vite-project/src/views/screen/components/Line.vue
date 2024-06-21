<template>
    <div class="linebg">
        <div class="titlebox">
            <p class="title">未来七天人数趋势</p>
            <p class="titlebg"></p>
        </div>
        <div class="charts" ref="chartsRef"></div>

    </div>
</template>

<script setup lang="ts" name="Line">
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';
let chartsRef = ref();

onMounted(()=>{
    let myCharts = echarts.init(chartsRef.value);
    myCharts.setOption({
        title: {
            title: '访问量'
        },
        xAxis: {
            type: 'category',
            data: ['周一','周二','周三','周四','周五','周六','周日'],
             //两侧不留白,从x轴0的位置开始开始
             boundaryGap: false,
             //刻度
            axisTick: {
                show: true
            }

        },
        yAxis: {
            //刻度
            axisTick: {
                show: true
            },
             //轴线的设置
             axisLine: {
                show: true
            },
                           //分割线不要
            splitLine: {
                show: false
            },

        },
        series: [
            {
                type: 'line',
                data: [40, 360, 880, 100, 320, 540, 1160],
                smooth:true,
                //区域填充样式
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: 'red' // 0% 处的颜色
                        }, {
                            offset: 1, color: 'blue' // 100% 处的颜色
                        }],
                        global: false // 缺省为 false
                    }
                }
            },
        ],
        grid: {
            left: 50,
            top: 50,
            right: 50,
            bottom: 50
        },
    })

})

</script>

<style scoped lang="scss">
.linebg {
    background: url('@/assets/images/screen/dataScreen-main-cb.png') no-repeat;
    background-size: 100% 100%;
    margin:0px 20px;
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
        height: calc(100% - 50px);
    }

}
</style>