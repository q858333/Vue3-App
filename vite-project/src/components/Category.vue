<template>
    <div>
        <el-card>

        <el-form :inline="true" :disabled="!enable">
                <el-form-item label="一级分类" class="form-item-class">
                     <el-select v-model="useCategory.c1ID" @change="useCategory.c1Change()">
                        <el-option v-for="item in useCategory.c1List" :label=item.name :value=item.id></el-option>
                     </el-select>
                </el-form-item>

                <el-form-item label="二级分类" class="form-item-class">
                     <el-select v-model="useCategory.c2ID" @change="useCategory.c2Change()">
                        <el-option v-for="item in useCategory.c2List" :label=item.name :value=item.id></el-option>
                     </el-select>
                </el-form-item>
                <el-form-item label="三级分类" class="form-item-class" >
                    <el-select v-model="useCategory.c3ID" @change="c3Change()">
                        <el-option v-for="item in useCategory.c3List" :label=item.name :value=item.id></el-option>
                     </el-select>
                </el-form-item>
           </el-form>
        </el-card>

    </div>
</template>

<script setup lang="ts" name="Category">
import { onMounted } from 'vue';
import useCategoryStore from '@/store/modules/category';

let useCategory = useCategoryStore();

let myEmits = defineEmits(['c3Change']);
let myProps = defineProps(['enable']);
onMounted(() => {
    initData();
})

function initData () {
    useCategory.fetchC1List();
}

function c3Change() {
    myEmits("c3Change");
}

</script>

<style scoped lang="scss">
.form-item-class {
    width: 300px;
}

</style>