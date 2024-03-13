import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router";
import {hasAuth, setTitle} from "./utils"
import {useUserStoreHook} from "@/store/modules/user";

// 通过Vite的import.meta.glob()方法实现自动化导入路由
//const mainRouterModules = import.meta.glob('../layout/*.vue')
const modules: Record<string, any> = import.meta.glob(
    ["./modules/**/*.ts"],
    {
        eager: true
    }
);

const routes: Array<RouteRecordRaw> = []

Object.keys(modules).forEach(key => {
    routes.push(...modules[key].default);
});


const router = createRouter({
    history: createWebHashHistory(),
    routes: routes,
    strict: true,
});


/** 路由白名单 */
const whiteList = ["/login"];
router.beforeEach((to: toRouteType, from, next) => {
    // 设置标题
    setTitle(to)
    if (to.query.uid) {
        useUserStoreHook().setUid(to.query.uid.toString())
        delete to.query.uid
        next({name: to.name, query: to.query})
        return
    }

    let meta = to.meta as CMeta
    if (whiteList.indexOf(to.path) !== -1 || !meta.needLogin || to.path === "/login") {
        next()
        return
    }

    const accredited = hasAuth()
    if (accredited) {
        next()
        return
    }

    next({
        path: "/login",
        query: {
            redirect: to.fullPath
        }
    });

})

router.afterEach((to: toRouteType) => {
})

export default router







