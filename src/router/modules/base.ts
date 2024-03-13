// 儿慈会管控端
export default [
    {
        path: "/",
        name: "index",
        redirect: "/data/visual3",
    },
    {
        path: "/data/visual",
        name: "dataVisual",
        component: () => import("@/views/visual/index.vue"),
        meta: {
            title: "数据可视化",
        }
    },
    {
        path: "/data/visual2",
        name: "dataVisual2",
        component: () => import("@/views/visual2/index.vue"),
        meta: {
            title: "数据可视化",
        }
    },
    {
        path: "/data/visual3",
        name: "dataVisual3",
        component: () => import("@/views/visual3/index.vue"),
        meta: {
            title: "DART数据大屏",
            needLogin: true
        }
    },
    {
        path: "/noAuth",
        name: "NoAuth",
        component: () => import("@/views/noAuth.vue"),
        meta: {
            title: "DART数据大屏",
        }
    },
    {
        path: "/login",
        name: "loginPage",
        component: () => import("@/views/login.vue"),
        meta: {
            title: "DART数据大屏",
        }
    }
] as Array<RouteConfigsTable>;
