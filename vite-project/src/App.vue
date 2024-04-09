<template>
 
  <div class="page">
    <el-button type="primary" size="default" :icon="Plus">点击</el-button>
    <el-button type="primary" size="small" :icon="Edit">点击</el-button>

     <SvgIcon name="phone"></SvgIcon>

  </div>
</template>

<script setup lang="ts">
import {Plus, Edit} from "@element-plus/icons-vue"
console.log(import.meta.env);
</script>

<style lang="scss" scoped>

 .page {
  background-color: $base-color;
 }
</style>