
<template>
    <div class="login_page">
       <el-row>
          <el-col :span="12" :xs='0'>111</el-col>
          <el-col :span="12">
            <el-form class="login_form">
              <h1>hello</h1>
              <h2>欢迎你</h2>
              <el-form-item>
                <el-input :prefix-icon="User" v-model="loginData.username">
                </el-input>
              </el-form-item>

              <el-form-item>
                <el-input :prefix-icon="Lock" v-model="loginData.password" show-password>
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button class="login_btn" type="primary" @click="onSubmit">Login</el-button>
              </el-form-item>

            </el-form>
          
          </el-col>

       </el-row>
    </div>
</template>

<script setup lang="ts">  
import { User, Lock } from '@element-plus/icons-vue';
import { loginFormData } from '@/api/user/type';
import {reactive} from 'vue';
import { useRouter, useRoute } from 'vue-router';
import  useUserStore  from '@/store/modules/user';
import pinia from '@/store';

import { ElNotification } from 'element-plus';

let loginData:loginFormData = <loginFormData>reactive({username:'admin',password:'111111'});


let $useRoute = useRoute();

let $router = useRouter();


let useUser = useUserStore(pinia);

async function onSubmit ()  {

  try {
    await useUser.userLogin(loginData);
    console.log("登录成功 token:",useUser.token);
    let pagePath = $useRoute.query.redirect ?? '/';
    $router.push({ path: pagePath } );
    ElNotification({
      type: 'success',
      message: '欢迎回来',
      title: `HI,${Date()}`
    });
  } catch (error) {
    ElNotification({
      type: 'error',
      message: (error as Error).message,
    });
  }

}

</script>

<style scoped lang="scss">
.login_page {
  width:100%;
  height: 100vh;
  background:url("@/assets/images/background.jpg");
  background-repeat: no-repeat;
  background-size: cover;
} 
.login_form {
  background: url("@/assets/images/login_form.png") no-repeat;
  position: relative;
  top:30vh;
  width: 70%;
  height: 30vh;
  padding: 40px;

  h1 {
      color: white;
      font-size: 40px;
    }

    h2 {
      font-size: 20px;
      color: white;
      margin: 20px 0px;
    }

}
.login_btn {
  width:100%;
}
</style>