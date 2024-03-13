import {defineStore} from "pinia";
import {store} from "@/store";
import {ref} from "vue";


const useSettingStore = defineStore('setting', () => {
    const pageIndex = ref(1)
    const autoSwitch = ref(false)
    const fullScreen = ref(false)
    const switchStep = ref(1)


    return {pageIndex, autoSwitch, switchStep, fullScreen}
}, {
    persist: {
        enabled: true,
        strategies: [
            {
                key: "setting",
                storage: localStorage, //自定义存储位置
                paths: ['pageIndex', 'autoSwitch', 'switchStep', 'fullScreen']
            }
        ]
    }
})


export function useSettingStoreHook() {
    return useSettingStore(store);
}
