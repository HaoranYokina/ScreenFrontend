import {defineStore} from "pinia";
import {store} from "@/store";
import {ref} from "vue";


const useUserStore = defineStore('user', () => {
    const userInfo = ref(undefined)
    const token = ref<string>('')
    const setUserInfo = (user) => {
        userInfo.value = user
    }
    const clean = (onlyUser?: boolean) => {
        userInfo.value = undefined
        token.value = ''
        uid.value = ''
    }

    const uid = ref<string>('')

    const setUid = (uidStr: string) => {
        uid.value = uidStr
    }
    const setToken = (tokenStr: string) => {
        token.value = tokenStr
    }

    return {
        userInfo, setUserInfo, setUid, setToken, uid, token, clean,
    }
}, {
    persist: {
        enabled: true,
        strategies: [
            {
                key: "user",
                storage: sessionStorage, //自定义存储位置
                paths: ["userInfo", 'uid', 'token']
            }
        ]
    }
})


export function useUserStoreHook() {
    return useUserStore(store)
}
