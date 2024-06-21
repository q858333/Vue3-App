<template>
    <div class="container">
        <div class="screen" ref="screenRef">
            <ScreenTop class="top"></ScreenTop>
            <div class="bottom">
                <div class="left">
                    <Tourist class="tourist">123</Tourist>
                    <Sex class="sex"></Sex>
                    <Age class="age"></Age>
                </div>
                <div class="center">
                    <Map class="map"></Map>
                    <Line class="line"></Line>
                </div>

                <div class="right">
                    <Rank class="rank"></Rank>
                    <Year class="year"></Year>
                    <Counter class="counter"></Counter>
                </div>
            </div>
        </div>


    </div>
</template>

<script setup lang="ts">

import {ref, onMounted} from 'vue'
import ScreenTop from './components/ScreenTop.vue'
import Tourist from './components/Tourist.vue'
import Sex from './components/Sex.vue'
import Age from './components/Age.vue'
import Map from './components/Map.vue'
import Line from './components/Line.vue'
import Year from './components/Year.vue'
import Counter from './components/Counter.vue'
import Rank from './components/Rank.vue'

let screenRef = ref();

onMounted(()=>{
    changeScreenScale();
});
//监听窗口大小变化
window.onresize = ()=>{
    changeScreenScale();
};


function getScale (w=1920,h=1080) {
    let ws = window.innerWidth / w;
    let hs = window.innerHeight / h;
    return ws > hs? hs:ws;
}

function changeScreenScale () {
    screenRef.value.style.transform=`scale(${getScale()})  translate(-50%,-50%)`;
}


</script>

<style scoped lang="scss">
.container {
    width: 100vw;
    height: 100vh;
    background: url('@/assets/images/screen/bg.png') no-repeat;
    background-size: cover;
    // background-color: skyblue;

    .screen {
        position: fixed;
        left:50%;
        top:50%;
        transform-origin: left top;
        width: 1920px;
        height: 1080px;
        .top {
            width: 100%;
            height: 40px;

        }
        .bottom {
            display: flex;
            .left {
                margin-left: 10px;
                margin-top: 10px;
                flex: 1;
                height: 1040px;
                display: flex;
                flex-direction: column;

                .tourist {
                    flex:1.2;
                }
                .age {
                    flex: 1;

                }
                .sex {
                    flex: 1;

                }
                
            }

            .center {
                flex: 2;
                display: flex;
                flex-direction: column;
            
                .map {
                    flex: 3;
                }
                .line{
                    flex: 1;
                }
            }

            .right {
                flex: 1;
                display: flex;
                flex-direction: column;
                margin-top: 10px;
                .rank {
                    flex: 1.5;
                }
                .year {
                    flex: 1;
                }
                .counter {
                    flex: 1;
                }

            }
        }

    }



}
</style>