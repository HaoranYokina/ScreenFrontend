<template>
    <div class="com-container">
        <div class="table-wrap">
            <div class="header">
                <div v-for="(item,i) in props.titles" :key="i">
                    <span>{{ item }}</span>
                </div>
            </div>
            <div class="body" ref="bodyRef">
                <vue-seamless-scroll :class-option="classOption" :data="props.dataList" v-if="show">
                    <div class="tr" v-for="(row,i) in props.dataList" :key="i">
                        <div class="td" v-for="(field,j) in props.fields">
                        <span>
                            {{ row[field] }}
                        </span>
                        </div>
                    </div>
                </vue-seamless-scroll>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {reactive, ref, watchEffect} from "vue";
import {useCompSettingStoreHook} from "@/store/modules/compSetting";

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
        type: Array,
        default: []
    },
})

const bodyRef = ref(null)
const show = ref(false)
const classOption = reactive({
    isSingleRemUnit: true,
    limitMoveNum: 100,
    singleHeight: .44, // 元素高度+下边距
    waitTime: 2000,
    stop: false // 是否开启滚动
})
/*
const dataList = reactive([
    {time: '2023-12-13 11:12:12', user: '王强', team: '勇闯天涯战队', score: 120},
    {time: '2023-12-13 11:12:12', user: '用户', team: '魔幻战队', score: 110},
    {time: '2023-12-13 11:12:12', user: '用户', team: '第1支队伍', score: 100},
    {time: '2023-12-13 11:12:12', user: '用户', team: '第2支队伍', score: 90},
    {time: '2023-12-13 11:12:12', user: '用户', team: '第3支队伍', score: 90},
    {time: '2023-12-13 11:12:12', user: '用户', team: '第4支队伍', score: 90},
    {time: '2023-12-13 11:12:12', user: '用户', team: '第5支队伍', score: 90},
    {time: '2023-12-13 11:12:12', user: '用户', team: '第7支队伍', score: 90},
    {time: '2023-12-13 11:12:12', user: '用户', team: '第8支队伍', score: 90},
])*/
const changeMoveNum = () => {
    if (!bodyRef.value) {
        return
    }
    show.value = false
    if (!props.dataList.length) {
        return;
    }
    setTimeout(() => {
        let h = bodyRef.value.clientHeight
        let fontSize = parseFloat(document.documentElement.style.fontSize)
        let remH = h / fontSize
        let cnt = remH / .44
        let chunkSize = Math.round(parseFloat(cnt.toString()))
        show.value = true
        classOption.limitMoveNum = chunkSize + 1
    }, 1)
}
let timer
let num = 0
window.addEventListener('resize', () => {
    clearTimeout(timer)
    timer = setTimeout(() => {
        changeMoveNum()
    }, 200)
})
watchEffect(() => {
    if (props.dataList.length) {
        setTimeout(() => {
            changeMoveNum()
        }, 300)
    }
    if (useCompSettingStoreHook().pageIndex) {
        setTimeout(() => {
            changeMoveNum()
        }, 100)
    }
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

    .tr {
        display: flex;
        justify-content: space-between;
        position: relative;
        text-align: center;
        font-size: .22rem;
        background-size: contain;
        align-items: center;
        height: .44rem;


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
                >span{
                    font-size: .26rem;
                }
            }
        }
    }
}

.body {
    flex: 1;
    margin-top: .25rem;
    overflow-y: auto;
    scrollbar-width: none;
    &::-webkit-scrollbar {
        display: none;
    }
}
</style>
