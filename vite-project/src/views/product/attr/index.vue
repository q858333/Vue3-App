<template>
    <div>
        <Category @c3Change="c3Change()" :enable="isShowList"></Category>


        <el-card style="margin:10px 0px">
            <div v-show="isShowList">
                <el-button type="primary" icon="Plus" @click="addClick" :disabled="!useCategory.c3ID">添加属性</el-button>
                <el-table border style="margin: 10px 0px;" :data="attrList">
                    <el-table-column label="序号" type="index" width="100" align="center"></el-table-column>
                    <el-table-column label="属性名称" width="200" prop="attrName"></el-table-column>
                    <el-table-column label="属性值名称">
                        <template #default="{ row }">
                            <el-tag style="margin: 5px;" v-for="item in row.attrValueList" :key="item.id"
                                type="primary">{{ item.valueName }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="200">
                        <template #default="{ row }">
                            <el-button type="primary" size="small" @click="editClick(row)">编辑</el-button>
                            <el-button type="danger" size="small" @click="deleteClick(row)">删除</el-button>
                        </template>
                    </el-table-column>

                </el-table>
            </div>
            <div v-show="!isShowList">
                <el-form>
                    <el-form-item label="属性名称">
                        <el-input placeholder="输入名称" v-model="currentAttrModel.attrName"></el-input>
                    </el-form-item>
                </el-form>
                <el-button type="primary" size="default" icon="Plus" @click="addAttrClick"
                    :disabled="!currentAttrModel.attrName">添加属性值</el-button>
                <el-button type="primary" size="default" @click="cancelClick">取消</el-button>
                <el-table border style="margin: 10px 0px;" :data="currentAttrModel.attrValueList">
                    <el-table-column label="序号" type="index" width="100" align="center"></el-table-column>
                    <el-table-column label="属性值名称">
                        <template #default="{ row }">
                            <el-input v-if="row.isEditing" v-model="row.valueName" placeholder="输入属性值名称" @blur="tagCancelEdit(row)"></el-input>
                            <div v-else @click="tagStartEdit(row)" style="background-color: bisque;">{{ row.valueName }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="属性值操作">
                        <template #default="{ row }">
                            <el-button type="danger" size="small" @click="tagDeleteClick(row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-button type="primary" size="default" @click="saveClick" :disabled="currentAttrModel.attrName.length==0||currentAttrModel.attrValueList.length==0">保存</el-button>
                <el-button type="primary" size="default" @click="cancelClick">取消</el-button>

            </div>


        </el-card>
    </div>
</template>

<script setup lang="ts">

// import { onMounted } from 'vue';
import Category from '@/components/Category.vue';
import useCategoryStore from '@/store/modules/category';
import { reqAddOrUpdateAttr, reqAttrList } from '@/api/product/attr'
import type { AttrListResponseData, AttrModel, AttrTagModel } from '@/api/product/attr/type'
import { ElMessage } from 'element-plus';
import { ref } from 'vue';
let attrList = ref<AttrModel[]>([]);

let isShowList = ref(true);
let useCategory = useCategoryStore();

let currentAttrModel = ref<AttrModel>({
    attrName: '',
    categoryId: 0,
    categoryLevel: 3,
    attrValueList: [],
})

function c3Change() {
    console.log('fetchAttrList');
    fetchAttrList();
}

async function fetchAttrList() {
    attrList.value = [];
    if (useCategory.c1ID && useCategory.c2ID && useCategory.c3ID) {
        let result: AttrListResponseData = await reqAttrList(useCategory.c1ID, useCategory.c2ID, useCategory.c3ID);
        if (result.code == 200) {
            attrList.value = result.data;
        } else {
            ElMessage.error('获取属性列表失败');
        }
    }
}
function addClick() {
    isShowList.value = false;
    currentAttrModel.value = {
        attrName: '',
        categoryId: useCategory.c3ID,
        categoryLevel: 3,
        attrValueList: [],
    };
}


function editClick(row: AttrModel) {
    console.log(row);
    isShowList.value = false;
    currentAttrModel.value = row;

}

function deleteClick(row: AttrModel) {
    console.log(row);
    currentAttrModel.value = row;

}

function tagDeleteClick (row: AttrTagModel) {
    let index = currentAttrModel.value.attrValueList.indexOf(row);
     currentAttrModel.value.attrValueList.splice(index, 1);
}

function tagCancelEdit (row: AttrTagModel) {
    row.isEditing = false;
    if(row.valueName.trim() == '') {
        let index = currentAttrModel.value.attrValueList.indexOf(row);
        currentAttrModel.value.attrValueList.splice(index, 1);
        ElMessage.error('属性值名称不能为空');
    } else {
        let result = currentAttrModel.value.attrValueList.findLast((item) => {
            if(item != row){
                return item.valueName == row.valueName;
            }
            return false;
         });
      if(result) {
        let index = currentAttrModel.value.attrValueList.indexOf(row);
        currentAttrModel.value.attrValueList.splice(index, 1);
        ElMessage.error('属性值名称已存在');
        return;
      }

    }
}

function tagStartEdit (row: AttrTagModel) {
    row.isEditing = true;
}


function cancelClick() {
    isShowList.value = true;

}
async function saveClick() {
    if(currentAttrModel.value.attrValueList.length > 0) {
      let result = currentAttrModel.value.attrValueList.findLast((item) => {
        return item.valueName.trim() == '';
      });
      if(result) {
        ElMessage.error('属性值名称不能为空');
        return;
      }
    }


    let result = await reqAddOrUpdateAttr(currentAttrModel.value);
    if (result.code == 200) {
        ElMessage.success(currentAttrModel.value.id ? '修改成功' : '添加成功');
        fetchAttrList();
    } else {
        ElMessage.error(currentAttrModel.value.id ? '修改失败' : '添加失败');
    }

}

function addAttrClick() {
    currentAttrModel.value.attrValueList.push({
        valueName: '',
        isEditing: true,
    })


}


</script>

<style scoped></style>