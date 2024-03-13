<template>
    <div class="com-container">
        <div class="table-wrap">
            <div class="header">
                <div v-for="(item,i) in props.titles" :key="i">
                    <span>{{ item }}</span>
                </div>
            </div>
            <div class="body" ref="bodyRef">
                <div class="tr" v-for="(row,i) in props.dataList" :key="i">
                    <div class="td" v-for="(field,j) in props.fields">
                        <span>
                            {{ row[field] }}
                        </span>
                    </div>
                </div>

                <div class="empty-box" v-if="hasLoad && (!dataList || !dataList.length)">
                    <span>暂无数据</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {allRecList, flagPage} from "@/api/compData";

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
const hasLoad = ref(false)

let stepTime = 10000
let refreshTimer
const startTimer = () => {
    clearInterval(refreshTimer)
    refreshTimer = setInterval(() => {
        loadRecPage()
    }, stepTime)
}

const loadRecPage = () => {
    allRecList<any>(1, 10).then(res => {
        let list = res.reslist || []
        list = list.filter(item => item.finalGroups).map(item => ({
            team: item.finalGroups?.name ?? '-',
            score: item.f1score.toString(),
            time: item.showTime
        }))
        props.dataList.length = 0
        props.dataList.push(...list)
    }).finally(()=>{
        hasLoad.value = true
    })
}

onMounted(() => {
    loadRecPage()
    startTimer()
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

            &:nth-of-type(3) {
                flex: .7;
            }

            &:last-of-type {
                flex: 1.2;
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

            &:nth-of-type(3) {
                flex: .7;
            }

            &:last-of-type {
                flex: 1.2;
            }

            &:first-of-type {
                flex: 1.2;
                >span{
                    text-align: left !important;
                }
            }
            &:first-of-type , &:nth-of-type(2){
                display: flex;
                > span {
                    width: 0;
                    flex: 1;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
            }

            width: 0;

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

.body {
    flex: 1;
    margin-top: .25rem;
    overflow-y: auto;
    scrollbar-width: none;

    &::-webkit-scrollbar {
        display: none;
    }
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
