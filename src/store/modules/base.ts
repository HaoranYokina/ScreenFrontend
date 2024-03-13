import {defineStore} from "pinia";
import {store} from "@/store";
import {ref} from "vue";


const useBaseStore = defineStore('base', () => {
    const isLoading = ref(false)
    const hasWxConfig = ref(false)
    const deviceId = ref('')
    const pageIndex = ref(1)

    const wxConfigSuccess = () => {
        hasWxConfig.value = true
    }

    const setLoading = (status: boolean) => {
        isLoading.value = status
    }

    const getDeviceId = () => {
        if (!deviceId.value) {
            deviceId.value = utils.uuidStr()
        }
        return deviceId.value
    }

    return {isLoading, pageIndex, setLoading, hasWxConfig, wxConfigSuccess, deviceId, getDeviceId}
}, {
    persist: {
        enabled: true,
        strategies: [
            {
                key: "base",
                storage: localStorage, //自定义存储位置
                paths: ["deviceId"]
            }
        ]
    }
})


export function useBaseStoreHook() {
    return useBaseStore(store);
}
