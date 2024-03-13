<template>
    <div class="flex-col h-100">
        <h3 class="title">
            <div class="title-line">
                <em class="v-line" :style="{backgroundColor:props.color}"></em>
                <span>{{ props.title }}: {{ curData?.ip }}</span>
            </div>
            <span v-if="props.machineList.length > 1" class="remark">{{ step }}秒后切换 {{ nextData.ip }}</span>
        </h3>
        <SourceChart :cpu="data.cpuPercentage" :mem="data.memoryPercentage" :network="data.bandwidth"/>
    </div>
</template>

<script setup lang="ts">
import {reactive, ref, watch} from "vue";
import {singleMetrics} from "@/api/compData";
import SourceChart from "@/views/visual3/components/chart/SourceChart.vue";

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
let interval = 10
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
const data = reactive({
    cpuPercentage: 0,
    memoryPercentage: 0,
    bandwidth: 0
})
const loadData = () => {
    if (!curData.value) {
        return
    }
    pos++
    singleMetrics<any>(curData.value.ip).then(res => {
        if (res) {
            Object.assign(data, res)
        }
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
    font-size: .2rem;
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
        font-size: .22rem;
        transform-origin: left center;
    }

    .v-line {
        margin-right: .12rem;
        width: .06rem;
        height: .22rem;
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
