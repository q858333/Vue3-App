<template>
    <div>
        <el-card style="margin: 10px 0px;width: 100%;">
            <el-table border :data="skuList">
                <el-table-column label="序号" type="index" width="100" align> </el-table-column>
                <el-table-column label="名称" width="200" prop="skuName"> </el-table-column>
                <el-table-column label="描述" width="300" prop="skuDesc"> </el-table-column>
                <el-table-column label="默认图片" width="150">
                    <template #default="{ row }">
                        <img :src="row.skuDefaultImg" :alt="row.skuDesc" style="width: 100px;height: 100px;" />
                    </template>
                </el-table-column>
                <el-table-column label="重量(克)" width="200" prop="weight"> </el-table-column>
                <el-table-column label="价格(元)" width="200" prop="price"> </el-table-column>

                <el-table-column label="操作" fixed="right" width="400">
                    <template #default="{ row }">
                        <el-button type="primary" size="small" :icon="row.isSale == 0 ? 'Top' : 'Bottom'"
                            @click="saleClick(row)"></el-button>
                        <el-button type="primary" size="small" icon="Edit" @click="editClick(row)"></el-button>
                        <el-button type="info" size="small" icon="InfoFilled" @click="infoClick(row)"></el-button>
                        <el-popconfirm title="Are you sure to delete?" icon="Delete" icon-color="red" width="250"
                            @confirm=deleteClick(row)>
                            <template #reference>
                                <el-button type="danger" size="small">删除</el-button>
                            </template>
                        </el-popconfirm>
                    </template>


                </el-table-column>
            </el-table>
        </el-card>
        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[10, 20, 30]"
            :background="true" layout="prev, pager, next ,->, total, sizes,jumper" :total="total"
            @size-change="handleSizeChange" @current-change="handleCurrentChange" />

        <!-- 抽屉 -->
        <el-drawer v-model="showDetail" title="SKU商品相亲" @closed="closeDrawer">
            <el-row >
                <el-col :span=6> 商品名称</el-col>
                <el-col :span=18>{{selectedSkuInfo?.skuName}}</el-col>
            </el-row>
            <el-row>
                <el-col :span=6>描述</el-col>
                <el-col :span=18>{{selectedSkuInfo?.skuDesc}}</el-col>
            </el-row>
            <el-row>
                <el-col :span=6>平台属性</el-col>
                <el-col :span=18>
                    <el-tag v-for="(item, index) in selectedSkuInfo?.skuAttrValueList" :key="index">{{ item.valueName }}</el-tag>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span=6>销售属性</el-col>
                <el-col :span=18>
                    <el-tag v-for="(item, index) in selectedSkuInfo?.skuSaleAttrValueList" :key="index">{{ item.saleAttrValueName }}</el-tag>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span=6>商品图片</el-col>
                <el-col :span=18>
                    <el-carousel :interval="3000" motion-blur autoplay loop pause-on-hover type="card" height="200px">
                        <el-carousel-item v-for="(item,index) in selectedSkuInfo?.skuImageList" :key="index">
                            <img :src="item.imgUrl" style="width:100%;height: 100%" />
                        </el-carousel-item>
                    </el-carousel>
                </el-col>
            </el-row>

        </el-drawer>


    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { AllSKUListResponseData,SKUDetailResponseData} from '@/api/product/SKU/type';
import { reqSKUList, reqChangeSKUSaleStatus,reqSKUDetail } from '@/api/product/SKU';
import { ElMessage } from 'element-plus';
import type { SKUModel } from '@/api/product/SPU/type';
// 当前页
let currentPage = ref(1);
// 当前页显示条数
let pageSize = ref(10);
// 总条数
let total = ref<number>(0);
//sku列表
let skuList = ref<SKUModel[]>([]);

//是否展示sku详情抽屉
let showDetail = ref(false);
let selectedSkuInfo = ref<SKUModel|undefined>();

// 分页大小改变
function handleSizeChange() {
    currentPage.value = 1;
    fetchSKUList();
}
// 当前页改变
function handleCurrentChange() {
    fetchSKUList();
}


onMounted(() => {
    fetchSKUList();
});

async function fetchSKUList() {
    let result: AllSKUListResponseData = await reqSKUList(currentPage.value, pageSize.value);
    if (result.code == 200) {
        total.value = result.data.total;
        skuList.value = result.data.records;
    } else {
        //获取失败提示
        ElMessage.error('获取失败');

    }
}

function closeDrawer () {
    selectedSkuInfo.value = undefined;
}

//按钮点击
//编辑按钮
function editClick(row: SKUModel) {
    console.log(row);
    ElMessage.success('该功能在研发中');

}
//详情按钮
async function infoClick(row: SKUModel) {
    showDetail.value = true;
    let result:SKUDetailResponseData = await reqSKUDetail(row.id ?? 0);
    if(result.code == 200) {
        selectedSkuInfo.value = result.data;
    } else {
        //获取失败提示
        ElMessage.error('获取失败');
    }
}
//删除按钮
function deleteClick(row: SKUModel) {

}
//上架下架按钮
async function saleClick(row: SKUModel) {
    let isSale = row.isSale;
    if (row.isSale == 0) {
        isSale = 1;
    } else {
        isSale = 0;
    }
    //调用接口
    let result = await reqChangeSKUSaleStatus(row.id ?? 0, isSale);
    if (result.code == 200) {
        if (isSale == 0) {
            ElMessage.warning('下架成功');
        } else {
            ElMessage.success('上架成功');
        }
        row.isSale = isSale;
    } else {
        ElMessage.error('操作失败');
    }
}


</script>

<style scoped>

.el-row {
    margin: 10px 0px;
}
.el-tag {
    margin: 5px 5px;

}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>