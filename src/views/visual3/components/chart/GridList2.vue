<template>
    <div class="com-container">
        <div class="table-wrap">
            <div class="header">
                <div v-for="(item,i) in ['队伍','成绩','排名']" :class="{'flex-2':item==='队员' || item === '队伍'}"
                     :key="i">
                    <span>{{ item }}</span>
                </div>
            </div>
            <div class="body" ref="tbodyRef">
                <swiper :modules="[Autoplay]"
                        :slides-per-view="swiperOptions.slidesPerView"
                        :space-between="0"
                        @slide-change-transition-start="changePage"
                        ref="swiperRef"
                        @swiper="swiperOptions.onSwiper"
                        :loop="true"
                        direction="vertical"
                        :autoplay="{
                            delay:10000,
                            disableOnInteraction:false,
                            stopOnLastSlide:false,
                        }"
                        v-if="show"
                        class="swiper-box">
                    <swiper-slide v-for="(page,i) in pageList" :key="i" class="slide-box">
                        <div class="tr" v-for="(row,j) in page.list" :key="j" :data-item="row+j"
                             :class="[{hasRank:row.ranking>0 && row.ranking<=3},`ranking${row.ranking}`]">
                            <div class="td flex-2 group-name-line">
                                <div class="group-name">
                                    <span>{{ row.groupName }}</span>
                                </div>
                            </div>
                            <div class="td">
                            <span>
                                {{ row.score }}
                            </span>
                                <em>分</em>
                            </div>
                            <div class="td">
                                <span v-if="row.ranking>0 && row.ranking<=3">
                                    NO.{{ row.ranking }}
                                </span>
                                <strong v-else>
                                    {{ (row.ranking < 0 || !row.ranking || row.ranking === '-1') ? '*' : row.ranking }}
                                </strong>
                            </div>
                        </div>
                    </swiper-slide>
                    <swiper-slide class="empty-box" v-if="hasLoad && (!dataList || !dataList.length)">
                        <span>暂无数据</span>
                    </swiper-slide>
                </swiper>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref, watch, watchEffect} from "vue";
import {Swiper, SwiperSlide} from "swiper/vue"
import {Autoplay} from 'swiper'
import 'swiper/css/bundle'
import {useCompSettingStoreHook} from "@/store/modules/compSetting";
import {useCompDataStoreHook} from "@/store/modules/compData";

const props = defineProps({
    dataFn: {
        type: Function,
        //require:true,
        default: null
    },
    debugFlag: {
        type: Boolean,
        default: false,
    },
    modifyField:{
        type:String,
    }
})
const dataList = reactive([])
const show = ref(true)
const hasLoad = ref(false)
const tbodyRef = ref(null)

const pageList = reactive([])

let swiperSelf
const swiperOptions = reactive({
    modules: [],
    slidesPerView: 1,
    onSwiper(s) {
        swiperSelf = s
    }
})

const loadData = async () => {
    if (!props.dataFn) {
        console.log('接口函数不能为空！')
        return
    }
    let error
    const res = await props.dataFn().catch(err => error = err)
    setTimeout(() => {
        hasLoad.value = true
    }, 300)
    if (error) {
        hasLoad.value = true
        return
    }
    dataList.length = 0
    dataList.push(...res)
    if (props.modifyField){
        useCompDataStoreHook()[props.modifyField] = dataList.length
    }
    if (dataList.length === 0) {
        delayLoad()
    }
}

function delayLoad() {
    clearTimeout(timer)
    timer = setTimeout(() => {
        loadData()
    }, 9000)
}

onMounted(() => {
    loadData()
})

const changePage = (swiper, realIndex) => {
    const page = swiper ? (swiper.realIndex + 1) : realIndex
    if (page === pageList.length) {
        delayLoad()
    }
}
const hasDomRender = ref(false)
const splitPage = () => {
    show.value = false
    let h = tbodyRef.value.clientHeight
    let fontSize = parseFloat(document.documentElement.style.fontSize)
    hasDomRender.value = h > 0
    let remH = h / fontSize
    let cnt = remH / .5
    let chunkSize = parseInt(cnt.toString())
    if (chunkSize <= 0) {
        return
    }
    pageList.length = 0
    const result = [];
    let page = 0
    for (let i = 0; i < dataList.length; i += chunkSize) {
        let data = {page: i + 1, list: dataList.slice(i, i + chunkSize)}
        //data.list.forEach((item, j) => item.rank = page * chunkSize + j + 1)
        result.push(data);
        page++
    }
    pageList.push(...result)
    setTimeout(() => {
        show.value = true
    })
    if (pageList.length <= 1) {
        delayLoad()
    }
}

let timer
window.addEventListener('resize', () => {
    clearTimeout(timer)
    timer = setTimeout(() => {
        splitPage()
    }, 200)
})

watchEffect(()=>{
    if (useCompSettingStoreHook().pageIndex && !hasDomRender.value) {
        clearTimeout(timer)
        timer = setTimeout(() => {
            splitPage()
        }, 200)
    }
})

watch(dataList, () => {
    clearTimeout(timer)
    timer = setTimeout(() => {
        splitPage()
    }, 100)
})

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
                text-align: left;

                span {
                    padding-left: .5rem;
                }
            }

            &.flex-2 {
                flex: 2;
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
                background: #063162;
            }

            &:after {
                position: absolute;
                content: '';
                left: 50%;
                bottom: 0;
                width: 30%;
                transform: translateX(-50%);
                height: .03rem;
                /*background: #0064ed;*/
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
        padding: .03rem;
        font-family: AlimamaShuHeiTiBold;
        background: url("@/assets/imgs/3/tr-5.png") no-repeat center /100% 99%;

        .group-name-line {
            display: inline-block;
            background: #063b71;
            height: 100%;
            line-height: 1.05;
            clip-path: polygon(0 0, 100% 0, 92% 100%, 0 100%);
        }

        &.hasRank {
            .group-name-line {
                background: #ffffff;
            }

            &.ranking1 {
                background: linear-gradient(to right, rgba(219, 169, 66, 0.8), rgba(219, 169, 66, 0.1) 70%, rgba(219, 169, 66, 0));
                background: url("@/assets/imgs/3/tr-1.png") no-repeat center /100% 99%;

                .td {
                    color: #f8b310;

                    &:nth-of-type(2) {
                        color: #ffffff;
                    }

                    &:last-of-type {
                        span {
                            font-size: .28rem;
                        }

                        font-style: italic;
                        font-weight: 1200;
                        color: rgba(219, 169, 66, 1);
                    }
                }
            }

            &.ranking2 {
                background: linear-gradient(to right, rgba(214, 140, 108, 0.8), rgba(214, 140, 108, 0.1) 70%, rgba(214, 140, 108, 0));
                background: url("@/assets/imgs/3/tr-2.png") no-repeat center /100% 99%;

                .td {
                    color: #f87976;

                    &:nth-of-type(2) {
                        color: #ffffff;
                    }

                    &:last-of-type {
                        span {
                            font-size: .28rem;
                        }

                        font-style: italic;
                        font-weight: 1200;
                        color: rgba(214, 140, 108, 1);
                    }
                }
            }

            &.ranking3 {
                background: linear-gradient(to right, rgba(52, 137, 225, 0.8), rgba(52, 137, 225, 0.1) 70%, rgba(52, 137, 225, 0));
                background: url("@/assets/imgs/3/tr-3.png") no-repeat center /100% 99%;

                .td {
                    color: #2395de;

                    &:nth-of-type(2) {
                        color: #ffffff;
                    }

                    &:last-of-type {
                        span {
                            font-size: .28rem;
                        }

                        font-style: italic;
                        font-weight: 1200;
                        color: rgba(52, 137, 225, 1);
                    }
                }
            }

        }


        &:last-of-type {
            margin-bottom: 0;
        }

        .td {
            width: 0;
            flex: 1;
            padding: .06rem 0;
            flex-flow: wrap;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;

            &:first-of-type {
                text-align: left;
                font-style: italic;
            }

            &.flex-2 {
                flex: 2;
            }

            > div {
                width: 100%;
                font-size: .22rem;
                padding-left: .1rem;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            > span {
                display: inline-block;
                font-size: .22rem;
                white-space: nowrap;
            }

            > strong {
                font-size: .22rem;
            }

            &:nth-of-type(2) {
                color: #3ecbff;
                font-family: QianTuHouHeiTi;
                font-style: italic;

                > span {
                    font-weight: 500;
                    font-size: .28rem;
                }

                > em {
                    display: inline-block;
                    font-size: .18rem;
                    font-family: initial;
                    margin-left: .03rem;
                }
            }

            &:last-of-type {
                color: #ffffff;
                font-family: QianTuHouHeiTi;
                font-style: italic;

                > span {
                    font-weight: 900;
                    font-size: .25rem;
                }

                > strong {
                    font-size: .28rem;
                }

            }
        }
    }
}

.swiper-box {
    height: 100%;
}

.empty-box {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: .26rem;
    color: #f3a142;
}

</style>
