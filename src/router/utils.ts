import {useUserStoreHook} from "@/store/modules/user";

export const hasAuth = (): boolean => {
    return !!useUserStoreHook().uid && !!useUserStoreHook().token

}
export const setTitle = (to: toRouteType) => {
    to.matched.some(item => {
        if (!item.meta.title) {
            //https://m.ybcdn.cn/homelib/#/sr/act/show/index?libid=3
            return
        } else {
            document.title = item.meta.title as string
        }
    })
}
