<template>

  <div class="page">
    <el-button type="primary" size="default" :icon="Plus">点击</el-button>
    <el-button type="primary" size="small" :icon="Edit">点击</el-button>

    <SvgIcon name="phone"></SvgIcon>

  </div>
</template>

<script setup lang="ts">
import { Plus, Edit } from "@element-plus/icons-vue";
import { onMounted } from "vue";
import request from "./utils/request";
// import axios from 'axios';
// console.log(import.meta.env);

onMounted(() => {
  console.log('onMounted');
  request({
    url: '/user/login',
    method: 'post',
    data: {
      username: 'admin',
      password: '111111'
    }
  }).then((res) => {
    console.log('res ', res);

  });

});

// function login() {
  // request({
  //   url: '/user/login',
  //   method: 'post',
  //   data: {
  //     username: 'admin',
  //     password: '111111'
  //   }
  // }).then((res) => {
  //   console.log('res ', res);

  // });
  
// }




</script>

<style lang="scss" scoped>
.page {
  background-color: $base-color;
}
</style>