<template>
    <div class="com-container">
        <div>
            <h3 class="title1 flex-sb" style="margin-bottom: .4rem">
                <span>每队完成各个漏洞的攻击防守得分列表</span>
                <div class="flex com switch-com">
                    <span>自动切换</span>
                    <div :class="{on:auto}" @click="auto = !auto"></div>
                </div>
            </h3>
            <div class="tip-box">
                <div>
                    <label>当前展示:</label>
                    <span>{{ curData?.name }}</span>
                </div>
                <div v-if="auto && nextData">
                    <label>{{ step }}秒后展示:</label>
                    <span>{{ nextData.name }}</span>
                </div>
            </div>
        </div>
        <div class="table-wrap">
            <div class="header">
                <div v-for="(item,i) in ['队伍','漏洞名称','得分']"
                     :class="{'flex-2':item==='队员' || item === '队伍'}" :key="i">
                    <span>{{ item }}</span>
                </div>
            </div>
            <div class="body" ref="bodyRef">
                <vue-seamless-scroll :class-option="classOption" :data="dataList" v-if="show">
                    <div class="tr" v-for="(row,i) in dataList" :key="i">
                        <div class="td">
                            <div>
                                <img src="@/assets/imgs/3/icon4.png" alt="" icon>
                                <span>
                                {{ row.team }}
                            </span>
                            </div>
                        </div>
                        <div class="td">
                            <span>
                                {{ row.name }}
                            </span>
                        </div>
                        <div class="td">
                            <span>
                                {{ row.score }}
                            </span>
                        </div>
                    </div>
                </vue-seamless-scroll>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {reactive, ref, toRaw, watch, watchEffect} from "vue";
import {useCompSettingStoreHook} from "@/store/modules/compSetting";
import {allBugfixOrFlagDetail, machineMetrics} from "@/api/compData";

const auto = ref(true)

const props = defineProps({
    bugFlagList: {
        type: [Array],
        default: []
    }
})
let timer = null
let interval = 10
let step = ref(interval)
let pos = 0
let dataLength = 0
let curData = ref(null)
let nextData = ref(null)

const startTimer = () => {
    clearInterval(timer)
    if (!auto.value) {
        return
    }
    timer = setInterval(() => {
        step.value--
        if (step.value > 0) {
            return
        }
        step.value = interval
        curData.value = props.bugFlagList[pos]
        loadData()
        if (pos > dataLength - 1) {
            pos = 0
        }
        nextData.value = props.bugFlagList[pos]
    }, 1000)
}
const dataList = reactive([])
const loadData = () => {
    if (!curData.value) {
        return
    }
    pos++
    let bugType = curData.value.bugType
    allBugfixOrFlagDetail<any>(curData.value.id, bugType).then(res => {
        dataList.length = 0
        let list = res.list || []
        if (bugType === 1) {
            list = list.map(item => {
                return {
                    time: item.flagSubmissions.submitTime,
                    name: res.flag.name, team: item.finalGroups.name, score: item.score || 0
                }
            })
        }
        if (bugType === 2) {
            list = list.map(item => {
                return {
                    time: item.bugfixSubmissions.submitTime,
                    name: `补丁-${res.bugfix.website}`, team: item.finalGroups.name, score: item.score || 0
                }
            })
        }
        dataList.push(...list)
        changeMoveNum()
    })
}


const bodyRef = ref(null)
const show = ref(true)
const classOption = reactive({
    isSingleRemUnit: true,
    limitMoveNum: 100,
    singleHeight: .62, // 元素高度+下边距
    step: .62,
    stop: false // 是否开启滚动
})
const changeMoveNum = () => {
    if (!bodyRef.value) {
        return
    }
    show.value = false
    setTimeout(() => {
        let h = bodyRef.value.clientHeight
        let fontSize = parseFloat(document.documentElement.style.fontSize)
        let remH = h / fontSize
        let cnt = remH / .62
        let chunkSize = Math.round(parseFloat(cnt.toString()))
        show.value = true
        classOption.limitMoveNum = chunkSize + 1
    }, 1)
}
let stimer
let num = 0
window.addEventListener('resize', () => {
    clearTimeout(stimer)
    stimer = setTimeout(() => {
        changeMoveNum()
    }, 200)
})
watchEffect(() => {
    if (useCompSettingStoreHook().pageIndex) {
        setTimeout(() => {
            changeMoveNum()
        }, 300)
    }
})

const init = () => {
    step.value = interval
    pos = 0
    curData.value = null
    nextData.value = null
    dataLength = props.bugFlagList ? props.bugFlagList.length : 0
    clearInterval(timer)
}

watch(props.bugFlagList, () => {
    init()
    if (props.bugFlagList && props.bugFlagList.length) {
        if (!curData.value) {
            curData.value = props.bugFlagList[0]
            loadData()
        }
        if (props.bugFlagList.length > 1) {
            nextData.value = toRaw(props.bugFlagList[1])
            startTimer()
        } else {
            nextData.value = null
            clearInterval(timer)
        }
    }
})

watch(auto, () => {
    if (!auto.value) {
        clearInterval(timer)
    } else if (props.bugFlagList.length > 1) {
        startTimer()
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
        background: #1a1f4a;

        > div {
            flex: 1;
            position: relative;
            text-align: center;
            padding: .1rem 0 .08rem;

            &:first-of-type {
                flex: 1.2;
                margin-left: .2rem;
            }


            > span {
                display: inline-block;
                font-size: .22rem;
            }

            &:before {
                position: absolute;
                content: '';
                left: 0;
                top: 0;
                width: 100%;
                height: .02rem;
                /*background: #063162;*/
            }

            &:after {
                position: absolute;
                content: '';
                left: 50%;
                top: 0;
                width: 16%;
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
        height: .62rem;

        &:nth-of-type(odd) {
            background: rgba(18, 30, 66, 0.8);
        }

        &:last-of-type {
            margin-bottom: 0;
        }

        .td {
            flex: 1;
            padding: .1rem 0;
            display: flex;
            align-items: center;
            justify-content: center;

            &:first-of-type {
                flex: 1.2;

                > div {
                    display: flex;
                    align-items: center;
                    width: 100%;

                    > img {
                        width: .3rem;
                        height: .4rem;
                        object-fit: contain;
                        object-position: center;
                        margin-right: .05rem;
                        margin-left: .1rem;
                        +span{
                            margin-left: -.1rem;
                        }
                    }

                    > span {
                        flex: 1;
                        width: 0;

                        font-size: .22rem;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                }
            }

            &:last-of-type, &:nth-of-type(3) {
                font-weight: 900;
                font-size: .25rem !important;
                font-style: italic;
                color: rgb(86, 158, 224);
                > span {
                    font-size: .26rem;
                }
            }

            > span {
                display: inline-block;
                font-size: .22rem;
                white-space: nowrap;
            }
        }
    }
}


.body {
    flex: 1;
    margin-top: .3rem;
    overflow-y: auto;
    scrollbar-width: none;
    &::-webkit-scrollbar {
        display: none;
    }
}

.title1 {
    position: relative;
    padding-left: .49rem;
    font-size: .26rem;
    font-weight: 400;
    letter-spacing: .01rem;

    &:before {
        position: absolute;
        content: '';
        left: 0;
        top: 50%;
        width: .26rem;
        height: .26rem;
        background: rgba(12, 60, 130, 1);
        border-radius: 100%;
        transform: translateY(-50%);
    }

    &:after {
        position: absolute;
        top: 50%;
        left: .08rem;
        transform: translateY(-50%);
        content: '';
        width: .1rem;
        height: .1rem;
        background: rgba(143, 225, 254, 1);
        border-radius: 100%;
    }
}

.com {
    font-size: .2rem;
    color: #b6becd;
    margin-left: .1rem;
    display: flex;
    align-items: center;

}

.switch-com {
    cursor: pointer;

    > div {
        border-radius: .5rem;
        width: .6rem;
        height: .26rem;
        box-sizing: border-box;
        margin: 0 .1rem;
        position: relative;
        transition: all .2s ease-in-out;
        background: linear-gradient(to right, #113150, #09467e);

        &:after {
            content: '';
            display: block;
            width: .2rem;
            height: .2rem;
            background: #ffffff;
            border-radius: 100%;
            margin: .03rem 0 .03rem .05rem;
            transition: margin .2s ease-in-out;
        }


        &.on {
            background: linear-gradient(to right, #70fdfc, #178dff);

            &:after {
                content: '';
                display: block;
                width: .2rem;
                height: .2rem;
                background: #ffffff;
                border-radius: 100%;
                margin: .03rem 0 .03rem .35rem;
            }
        }
    }
}


.tip-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: .3rem;
    padding: 0 .1rem;

    label {
        font-size: .2rem;
        color: rgba(248, 248, 248, 0.6);
        margin-right: .05rem;
    }

    span {
        font-size: .23rem;
        color: rgb(233, 196, 39);
        font-style: italic;
    }
}
</style>
