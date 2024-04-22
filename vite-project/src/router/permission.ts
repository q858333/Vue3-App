
import router from ".";
import nprogress from "nprogress";
import "nprogress/nprogress.css";

router.beforeEach((to, from, next) => {

    nprogress.start();
    next();
});

router.afterEach((to,from) => {

    nprogress.done();
});

