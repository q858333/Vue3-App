<template>
    <div class="mapbg" ref="mapRef">

    </div>
</template>

<script setup lang="ts" name="Map">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts';
import china from '../json/china.json';
let mapRef = ref();
let chinaJson: any = china;

echarts.registerMap('china', chinaJson);

onMounted(() => {

    var chart = echarts.init(mapRef.value);
    chart.setOption({
        geo: [{
            map: 'china',
            left: 80,
            top: 90,
            right: 120,
            bottom: 0,
            label: {
                show: true,
                color: 'white',
            },
            itemStyle: {
                opactiy: 0.8,
                areaColor: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0, color: 'skyblue' // 0% 处的颜色
                    }, {
                        offset: 1, color: 'blue' // 100% 处的颜色
                    }],
                    global: false // 缺省为 false
                }
            },
            //高亮状态
            emphasis: {
                label: {
                    show: true,
                    color: 'white',
                    fontSize: 16,
                },
                itemStyle: {
                    areaColor: 'blue',
                }
            },
            regions: [{
                name: '北京市',
                itemStyle: {
                    areaColor: 'red',
                    color: 'red'
                },
                emphasis: {
                    label: {
                        show: true,
                        color: 'white',
                        fontSize: 16,
                    },
                    itemStyle: {
                        areaColor: 'red',
                    }
                },
            }]

        }],
        series: [
            {
                type: 'lines',
                data: [
                    {
                        coords:[
                        [116.405285,39.904989],
                         [126.642464,45.756967], ],
                         lineStyle: {
                            color: 'black',
                            width: 5
                        }
                    },
                    {
                        coords:[
                        [116.405285,39.904989],
                         [119.306239,26.075302], ],
                         lineStyle: {
                            color: 'black',
                            width: 5
                        }
                    },
                    
                ],
                effect:{
                    show:true,
                    symbol:'arrow',
                    symbolSize:15,
                    roundTrip:true,
                }
            },

        ]


    });

})
</script>

<style scoped lang="scss">
.mapbg{
    width:100%;
    height:100%;
    // background-color: red;
}
</style>