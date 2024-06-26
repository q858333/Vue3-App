import type { ResponseData } from '@/api/base/type'
export interface loginFormData {
    username:String,
    password:String,
}


//定义全部接口返回数据都拥有ts类型


  export interface UserInfo {
    username: string
    avatar: string
  }

  
  //定义登录接口返回数据类型
  export interface loginResponseData extends ResponseData {
    data: string
  }
  
  //定义获取用户信息返回数据类型
  export interface userInfoReponseData extends ResponseData {
    data: {
      routes:string[]
      buttons:string[]
      roles:string[]
      name:string
      avatar:string
    }
  }