<template>
    <div>
        <el-form label-width="100">
            <el-form-item label="SPU名称">
                <el-input placeholder="输入名称"></el-input>
            </el-form-item>
            <el-form-item label="SPU品牌">
                <el-select style="width: 200px;">
                    <el-option label="label" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="SPU描述">
                <el-input placeholder="输入描述" type="textarea"></el-input>
            </el-form-item>
            <el-form-item label="SPU照片">
                <el-upload v-model:file-list="fileList"
                    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" list-type="picture-card"
                    :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
                    <el-icon>
                        <Plus />
                    </el-icon>
                </el-upload>

            </el-form-item>
            <el-form-item label="SPU销售属性">
                <el-select style="width: 200px;">
                    <el-option label="label" value="1"></el-option>
                </el-select>
                <el-button type="primary" icon="Plus" style="margin: 0px 10px;">添加销售属性</el-button>
                <el-table border style="margin: 10px 0px;">
                    <el-table-column tyep="index" align="center" label="序号" width="100"></el-table-column>
                    <el-table-column label="属性名" width="100"></el-table-column>
                    <el-table-column label="属性值"></el-table-column>
                    <el-table-column label="操作" width="100"></el-table-column>
                </el-table>
                <el-button type="primary" @click="saveClick">保存</el-button>
                <el-button @click="cancelClick">取消</el-button>


            </el-form-item>

        </el-form>
    </div>
</template>

<script setup lang="ts" name="spuForm">

let $emit=defineEmits(['saveClick','cancelClick']);

function handlePictureCardPreview(file: any) {
    console.log(file);
}

function handleRemove(file: any, fileList: any) {
    console.log(file, fileList);
}

function cancelClick () {
    $emit('cancelClick');

}

function saveClick () {
    $emit('saveClick');
}
</script>

<style scoped lang="scss"></style>