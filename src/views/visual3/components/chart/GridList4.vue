<template>
    <div class="com-container">
        <div class="table-wrap">
            <div class="header">
                <div v-for="(item,i) in props.titles" :key="i">
                    <span>{{ item }}</span>
                </div>
            </div>
            <div class="body" ref="tbodyRef">
                <swiper :modules="[Autoplay]"
                        :slides-per-view="swiperOptions.slidesPerView"
                        :space-between="0"
                        ref="swiperRef"
                        @swiper="swiperOptions.onSwiper"
                        @slide-change-transition-start="changePage"
                        :loop="true"
                        direction="vertical"
                        :autoplay="{
                            delay:10000,
                            disableOnInteraction:false,
                            stopOnLastSlide:false,
                        }"
                        v-if="show"
                        class="swiper-box">
                    <swiper-slide v-for="i in totalPage" :key="i" class="slide-box">
                        <template v-if="pageMap[i]">
                            <div class="tr" v-for="(row,j) in pageMap[i]" :key="j">
                                <div class="td" v-for="(field,k) in props.fields" :key="k">
                                    <span>
                                        {{ row[field] }}
                                    </span>
                                </div>
                            </div>
                            <div class="loading-box"  v-if="!pageMap[i].length">
                                <span>暂无数据</span>
                            </div>
                        </template>
                        <div class="loading-box" v-else>
                            <Loading class="loading"/>
                            <span>数据加载中...</span>
                        </div>
                    </swiper-slide>
                </swiper>
                <div class="loading-box" v-if="!hasLoad">
                    <Loading class="loading"/>
                    <span>数据加载中...</span>
                </div>
                <div class="loading-box" v-if="hasLoad && !totalPage">
                    <span>暂无数据</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref, toRef, watch, watchEffect} from "vue";
import {Swiper, SwiperSlide} from "swiper/vue"
import {Autoplay} from 'swiper'
import 'swiper/css/bundle'
import {useCompSettingStoreHook} from "@/store/modules/compSetting";
import {allRecList} from "@/api/compData";
import Loading from "../loading.vue"
import {useCompDataStoreHook} from "@/store/modules/compData";

const props = defineProps({
    titles: {
        type: Array,
        default: []
    },
    fields: {
        type: Array,
        default: []
    },
    dataList: {
        type: [Array<any>],
        default: []
    },
})
const show = ref(false)
const tbodyRef = ref(null)


let swiperSelf
const swiperOptions = reactive({
    modules: [],
    slidesPerView: 1,
    onSwiper(s) {
        swiperSelf = s
    }
})
const hasLoad = ref(false)
const totalPage = ref(0)
const dataTotal = ref(0)
const pageSize = ref(10)
const pageMap = reactive({})
const init = () => {
    totalPage.value = 0
    dataTotal.value = 0
    pageSize.value = 10
    show.value = false
    for (let i in pageMap) {
        delete pageMap[i]
    }
    loadTotal()
}
const changePage = (swiper, realIndex) => {
    const page = swiper ? (swiper.realIndex + 1) : realIndex
    if (!pageMap[page]) {
        loadRecList(page)
    }
}
const loadRecList = (page: number) => {
    allRecList<any>(page, pageSize.value).then(res => {
        let list = res.reslist || []
        list = list.filter(item => item.finalGroups).map(item => ({
            team: item.finalGroups?.name ?? '-',
            score: item.f1score.toString(),
            time: item.showTime
        }))
        pageMap[page] = list.slice(0,pageSize.value)
    }).finally(()=>{
        if (page === totalPage.value){
            clearTimeout(timer)
            timer = setTimeout(()=>{
                init()
            },8000)
        }
    })
}
const loadTotal = () => {
    hasLoad.value = false
    allRecList<any>(1, 1).then(res => {
        hasLoad.value = true
        dataTotal.value = res.total || 0
        if (dataTotal.value === 0 ){
            return
        }
        countPageSize()
        const chunkSize = countPageSize()
        pageSize.value = chunkSize
        totalPage.value = Math.ceil(dataTotal.value / chunkSize)
        changePage(null, 1)
        show.value = true
    })
}

const countPageSize = () => {
    let h = tbodyRef.value.clientHeight
    let fontSize = parseFloat(document.documentElement.style.fontSize)
    let remH = h / fontSize
    let cnt = remH / .5
    let chunkSize = parseInt(cnt.toString())
    return chunkSize
}
let timer
window.addEventListener('resize', () => {
    clearTimeout(timer)
    timer = setTimeout(() => {
        if (useCompSettingStoreHook().pageIndex === 1) {
            init()
        }
    }, 300)
})

onMounted(() => {
    clearTimeout(timer)
    timer = setTimeout(() => {
        if (useCompSettingStoreHook().pageIndex === 1) {
            loadTotal()
        }
    }, 100)
})

watchEffect(() => {
    if (useCompSettingStoreHook().pageIndex === 1) {
        clearTimeout(timer)
        timer = setTimeout(() => {
            loadTotal()
        }, 300)
    }
})

/*
watchEffect(()=>{
    if (useCompDataStoreHook().refreshCount > 0){
        setTimeout(()=>{
            if (useCompSettingStoreHook().pageIndex === 1) {
                init()
            }
        },100)
    }
})
*/


</script>

<style scoped lang="scss">
.com-container {
    height: 0;
    display: flex;
    flex-direction: column;

}

.table-wrap {
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    position: relative;
    scrollbar-width: none;

    &::-webkit-scrollbar {
        display: none;
    }

    .header {
        display: flex;
        justify-content: space-between;
        position: relative;

        > div {
            flex: 1;
            position: relative;
            text-align: center;
            padding-bottom: .2rem;

            &:first-of-type {
                flex: 1.2;
                text-align: left;

                &:after {
                    left: 0;
                }
            }


            > span {
                display: inline-block;
                font-size: .22rem;
            }

            &:before {
                position: absolute;
                content: '';
                left: 0;
                bottom: 0;
                width: 100%;
                height: .02rem;
                /*background: #063162;*/
            }

            &:after {
                position: absolute;
                content: '';
                left: 50%;
                bottom: 0;
                width: 30%;
                transform: translateX(-50%);
                height: .03rem;
                background: #0064ed;
            }
        }
    }

    .body {
        flex: 1;
        margin-top: 0;
        overflow-y: hidden;
        position: relative;
        /* 自定义滚动条样式 */
        &::-webkit-scrollbar {
            width: 5px; /* 设置滚动条宽度 */
        }

        &::-webkit-scrollbar-thumb {
            background-color: #4794f1; /* 设置滚动条滑块颜色 */
            border-radius: 5px; /* 设置滚动条滑块圆角 */
        }

        &::-webkit-scrollbar-track {
            background-color: rgba(4, 19, 38, 0.2); /* 设置滚动条轨道颜色 */
            box-shadow: 0 0 10px rgba(4, 19, 38, 0.1) inset;
        }
    }

    .tr {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        text-align: center;
        margin: .1rem 0;
        font-size: .22rem;
        height: .4rem;
        padding: .02rem;


        &:last-of-type {
            margin-bottom: 0;
        }

        .td {
            flex: 1;
            padding: .10rem 0;

            > span {
                display: inline-block;
                font-size: .22rem;
                white-space: nowrap;
            }

            &:first-of-type {
                display: flex;
                flex: 1.2;

                > span {
                    width: 0;
                    flex: 1;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    text-align: left;
                }
            }

            &:nth-of-type(2) {
                color: rgb(86, 158, 224);
                font-weight: bold;

                > span {
                    font-size: .26rem;
                }
            }
        }
    }
}

.swiper-box {
    height: 100%;
    overflow: hidden;
}

.loading-box {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: .26rem;
    color: #f3a142;
    .loading{
        padding: 0;
        margin-right: .2rem;
    }
}
</style>
