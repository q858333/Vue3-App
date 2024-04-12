import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//@ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'virtual:svg-icons-register'
import router from './router'
import { createPinia } from 'pinia'


const app = createApp(App);
app.use(ElementPlus,{
    locale: zhCn,
});

//安装使用自定义插件（全局引入）
import gloablComponent from './components';
app.use(gloablComponent);
//引入模版全局样式
import '@/style/index.scss'

//注册全局组建图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

//创建pinia
const pinia = createPinia();
app.use(pinia);

app.use(router);

app.mount('#app');