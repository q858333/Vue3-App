
import router from ".";
import nprogress from "nprogress";
import "nprogress/nprogress.css";
import gsetting from "@/gsetting";
import useUserStore from "@/store/modules/user";
import pinia from "@/store";

nprogress.configure({ showSpinner: false });

    let useUser = useUserStore(pinia);

router.beforeEach(async (to, from, next) => {


    nprogress.start();
    if(useUser.token) {
        console.log("token存在");   
        if(to.path === '/login') {
            next({path:"/"});
        } else {
            if(useUser.username){
                next();
            } else {

                try {
                    let result = await useUser.userInfo();
                    console.log("获取用户信息成功 ", result);
                    next();
                } catch (error) {
                     useUser.userLogout();
                    console.log("获取用户信息失败", error);
                    next({path:"/login"});
                }
               
            }

        }

    } else {
        console.log("token不存在");   

        if(to.path === '/login') {
            next();
        } else {
            next({path:"/login",query:{redirect:to.path}});
        }
    }
    
});

router.afterEach((to,from) => {

    document.title = gsetting.title + '-' + to.meta.title;
    nprogress.done();
});

