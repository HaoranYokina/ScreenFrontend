import {createApp} from 'vue';
import App from './App.vue';
import router from './router';
import {store} from './store';
import commonUtil from '@/uitls/commonUtil'
import dateUtil from '@/uitls/dataUtils'
import dPlugin from '@/directives/plugin'
import vueSeamlessScroll from '@zengxiaohui/vue3-seamless-scroll'

import "../mock/index"

// 扩展内置对象方法
dateUtil.setupDataFormat()

const app = createApp(App)

// 绑定到windows对象
let _window = window as any
_window.utils = commonUtil

app.config.globalProperties.utils = commonUtil
app.config.globalProperties.$utils = commonUtil

app.use(store)
    .use(router)
    .use(dPlugin)
    .use(vueSeamlessScroll)
    .mount('#app');
