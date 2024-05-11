<template>
    <div>
        <el-form label-width="100">
            <el-form-item label="SKU名称">
                <el-input placeholder="SKU名称"></el-input>
            </el-form-item>
            <el-form-item label="价格（元）">
                <el-input placeholder="价格（元）" type="number"></el-input>
            </el-form-item>
            <el-form-item label="重量（克）">
                <el-input placeholder="重量（克）" type="number"></el-input>
            </el-form-item>
            <el-form-item label="SKU描述">
                <el-input placeholder="SKU描述" type="textarea"></el-input>
            </el-form-item>

            <el-form-item label="平台属性">
                <el-form :inline="true">
                    <el-form-item label="内存"  style="margin-bottom: 10px;">
                        <el-select placeholder="内存" style="width: 220px;">
                            <el-option label="4G" value="4G"></el-option>
                            <el-option label="8G" value="8G"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="内存" style="margin-bottom: 10px;">
                        <el-select placeholder="内存" style="width: 220px;">
                            <el-option label="4G" value="4G"></el-option>
                            <el-option label="8G" value="8G"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="内存" style="margin-bottom: 10px;">
                        <el-select placeholder="内存" style="width: 220px;">
                            <el-option label="4G" value="4G"></el-option>
                            <el-option label="8G" value="8G"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="内存" style="margin-bottom: 10px;">
                        <el-select placeholder="内存" style="width: 220px;">
                            <el-option label="4G" value="4G"></el-option>
                            <el-option label="8G" value="8G"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="内存" style="margin-bottom: 10px;">
                        <el-select placeholder="内存" style="width: 220px;">
                            <el-option label="4G" value="4G"></el-option>
                            <el-option label="8G" value="8G"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="内存" style="margin-bottom: 10px;">
                        <el-select placeholder="内存" style="width: 220px;">
                            <el-option label="4G" value="4G"></el-option>
                            <el-option label="8G" value="8G"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>

            </el-form-item>
            <el-form-item label="销售属性">
                <el-form :inline="true">
                    <el-form-item label="内存">
                        <el-select  style="width: 220px;">
                            <el-option label="4G" value="4G"></el-option>
                            <el-option label="8G" value="8G"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="内存">
                        <el-select style="width: 220px;">
                            <el-option label="4G" value="4G"></el-option>
                            <el-option label="8G" value="8G"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="内存" >
                        <el-select style="width: 220px;">
                            <el-option label="4G" value="4G"></el-option>
                            <el-option label="8G" value="8G"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>

            </el-form-item>

            <el-form-item label="图片名称">
                <el-table border>
                    <el-table-column type="selection" width="60" align="center">
                        
                    </el-table-column>
                    <el-table-column label="图片">
                    </el-table-column>
                    <el-table-column label="名称">
                    </el-table-column>
                    <el-table-column label="操作">
                    </el-table-column>
                </el-table>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="saveClick">保存</el-button>
                <el-button type="primary" @click="cancelClick">取消</el-button>

            </el-form-item>
            
        </el-form>
    </div>
</template>

<script setup lang="ts" name="skuForm">

let myEmits = defineEmits(['cancelClick', 'saveClick']);

//按钮点击
//取消
function cancelClick() {
    console.log('cancelClick');
    myEmits('cancelClick');
}
//保存
function saveClick() {

    myEmits('saveClick');
}
</script>

<style scoped>

</style>