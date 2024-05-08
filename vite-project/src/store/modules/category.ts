//商品分类全局组件的小仓库
import { defineStore } from 'pinia'
import { reqC1, reqC2, reqC3 } from '@/api/product/attr'
import type { CategoryResponseData, CategoryState } from '@/api/product/attr/type'
import { ElMessage } from 'element-plus'

const useCategoryStore = defineStore('Category', {
  state:():CategoryState=>{
    return {
      c1ID:'',
      c1List:[],
      c2ID:'',
      c2List:[],
      c3ID:'',
      c3List:[],
    }
  },

  actions:{

    //获取一级分类的数据
    async fetchC1List(){
      let result:CategoryResponseData = await reqC1();
      if(result.code == 200) {
        this.c1List = result.data;
      } else {
        ElMessage.error('获取一级分类失败');
      }
      
    },

    //获取二级分类的数据
    async fetchC2List(){
      let result:CategoryResponseData = await reqC2(this.c1ID);
      if(result.code == 200) {
        this.c2List = result.data;
      } else {
        ElMessage.error('获取二级分类失败');
      }
      
    },
    //获取三级分类的数据
    async fetchC3List(){
      let result:CategoryResponseData = await reqC3(this.c2ID);
      if(result.code == 200) {
        this.c3List = result.data;
      } else {
        ElMessage.error('获取三级分类失败');
      }
      
    },
    
    //选项卡切换
    c1Change(){
      this.c2ID = '';
      this.c2List=[];
      this.c3ID='';
      this.c3List = [];
      this.fetchC2List();
    },

    c2Change(){
      this.c3ID='';
      this.c3List = [];
      this.fetchC3List();
    },

  },

  
  getters: {},


});


export default useCategoryStore
