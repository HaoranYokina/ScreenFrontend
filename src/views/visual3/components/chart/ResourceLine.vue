<template>
    <div class="flex-col h-100">
        <h3 class="title">
            <div class="title-line">
                <em class="v-line" :style="{backgroundColor:props.color}"></em>
                <span>{{ props.title }}: {{ curData?.ip }}</span>
            </div>
            <span v-if="props.machineList.length > 1" class="remark">{{ step }}秒后切换 {{ nextData.ip }}</span>
        </h3>

        <BrokenLineOne class="flex-1" color="rgb(116, 250, 242)" style="margin-top: .1rem;"
                       title="运行负载曲线" sub-title="CPU"
                       :data-list="dataList.map(item=>({key:item.statTime,value:item.cpuPercentage}))"/>
        <BrokenLineOne class="flex-1" color="rgb(163, 233, 118)" style="margin-top: .3rem;"
                       title="运行负载曲线" sub-title="内存"
                       :data-list="dataList.map(item=>({key:item.statTime,value:item.memoryPercentage}))"/>
        <BrokenLineOne class="flex-1" color="rgb(76, 148, 237)" style="margin-top: .3rem;"
                       title="运行负载曲线" sub-title="带宽" :is-per="false"
                       :data-list="dataList.map(item=>({key:item.statTime,value:item.bandwidth}))"/>
    </div>
</template>

<script setup lang="ts">
import {reactive, ref, watch} from "vue";
import {machineMetrics} from "@/api/compData";
import BrokenLineOne from "@/views/visual3/components/chart/BrokenLineOne.vue";

const chartDom = ref(null)
const max = ref()

const props = defineProps({
    color: {
        type: String,
        default: '#33b3d5'
    },
    title: {
        type: String,
        default: ''
    },
    machineList: {
        type: [Array],
        default: []
    }
})

let timer = null
let interval = 5
let step = ref(interval)
let pos = 0
let dataLength = 0
let curData = ref(null)
let nextData = ref(null)

const startTimer = () => {
    clearInterval(timer)
    timer = setInterval(() => {
        step.value--
        if (step.value > 0) {
            return
        }
        step.value = interval
        curData.value = props.machineList[pos]
        loadData()
        if (pos > dataLength - 1) {
            pos = 0
        }

        nextData.value = props.machineList[pos]
    }, 1000)
}
const dataList = reactive([])
const loadData = () => {
    if (!curData.value) {
        return
    }
    pos++
    machineMetrics<any>(curData.value.ip).then(res => {
        dataList.length = 0
        dataList.push(...(res || []))

    })
}


const init = () => {
    step.value = interval
    curData.value = null
    nextData.value = null
    dataLength = props.machineList ? props.machineList.length : 0
    clearInterval(timer)
}

watch(props.machineList, () => {
    init()
    if (props.machineList && props.machineList.length) {
        pos = 0
        if (!curData.value) {
            curData.value = props.machineList[0]
            loadData()
        }
        if (props.machineList.length > 1) {
            nextData.value = props.machineList[1]
            startTimer()
        } else {
            clearInterval(timer)
        }
    }
})

</script>

<style scoped lang="scss">

.top-number-wrap {
    padding: .2rem 0 .3rem 0;
    font-size: .21rem;
    transform-origin: left center;
}

.title {
    position: relative;
    margin-bottom: .3rem;
    font-size: .2rem;
    font-weight: 400;
    display: flex;
    justify-content: space-between;

    .title-line {
        display: flex;
        align-items: center;
    }

    span {
        transform-origin: left center;
    }

    .v-line {
        margin-right: .12rem;
        width: .06rem;
        height: .2rem;
        background: rgb(138, 239, 251);
    }

    .point {
        position: relative;
        display: flex;
        align-items: center;

        span {
            display: block;
            width: .05rem;
            height: .05rem;
            background: rgb(138, 239, 251);
            border-radius: 100%;
            margin-left: .07rem;
        }
    }
}

.sub-title {
    margin-left: .2rem;
    padding-right: .02rem;
    font-style: italic;
    font-weight: bold;
    font-size: .23rem;
    background-image: linear-gradient(to bottom, #ddf5fe, #7cdbfb);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.remark {
    color: rgb(233, 196, 39);
    font-style: italic;
    font-size: .18rem;
}

</style>
