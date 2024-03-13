import {defineStore} from "pinia";
import {store} from "@/store";
import {ref} from "vue";


const useCompSettingStore = defineStore('compSetting', () => {
    const pageIndex = ref(1)
    const autoSwitch = ref(false)
    const fullScreen = ref(false)
    const switchStep = ref(1)
    const hasPageTwo = ref(true)

    const setHasPageTwo = (hasP2: boolean) => {
        hasPageTwo.value = hasP2
        if (!hasP2) {
            pageIndex.value = 1
            autoSwitch.value = false
        }

    }

    return {pageIndex, autoSwitch, switchStep, fullScreen, hasPageTwo, setHasPageTwo}
}, {
    persist: {
        enabled: true,
        strategies: [
            {
                key: "compSetting",
                storage: localStorage, //自定义存储位置
                paths: ['pageIndex', 'autoSwitch', 'switchStep', 'fullScreen']
            }
        ]
    }
})


export function useCompSettingStoreHook() {
    return useCompSettingStore(store);
}
