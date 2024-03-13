<template>
    <div class="flex-col h-100">
        <h3 class="title">
            <div class="title-line">
                <em class="v-line" :style="{backgroundColor:props.color}"></em>
                <span>{{ props.title }}: {{ curData?.ip }}</span>
                <span v-if="props.machineList.length > 1" class="remark">{{ step }}秒后切换 {{ nextData.ip }}</span>
            </div>
            <div class="flex">
                <div class="point">
                    <span :style="{backgroundColor:props.color}"></span>
                    <span :style="{backgroundColor:props.color}"></span>
                    <span :style="{backgroundColor:props.color}"></span>
                </div>
                <div class="sub-title" :style="`background-image: linear-gradient(to bottom,#ddf5fe,${props.color});`">
                    {{ subTitle }}
                </div>
            </div>
        </h3>
        <div class="flex-1 chart-wrap">
            <div class="chart h-100" ref="chartDom">
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {reactive, ref, watch, watchEffect} from "vue";
import * as echarts from "echarts";
import {useCompSettingStoreHook} from "@/store/modules/compSetting";
import {machineMetrics} from "@/api/compData";

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
    subTitle: {
        type: String,
        default: 'CPU'
    },
    machineList: {
        type: [Array],
        default: []
    },
    dataList1: {
        type: [Array<{ key: string, value: any }>],
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

function colorToRGBA(color, alpha) {
    // 判断传入的是十六进制还是RGB/RGBA
    if (color.startsWith("#")) {
        let hex = color.slice(1);
        let r = parseInt(hex.slice(0, 2), 16);
        let g = parseInt(hex.slice(2, 4), 16);
        let b = parseInt(hex.slice(4, 6), 16);
        return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else if (color.startsWith("rgb") || color.startsWith("rgba")) {
        let rgba = color.match(/\d+/g);
        if (rgba.length === 3) {
            rgba.push(alpha);
        } else if (rgba.length === 4) {
            rgba[3] = alpha;
        }
        return "rgba(" + rgba.join(", ") + ")";
    }
    return color; // 不是有效的颜色值，直接返回原值
}

let chartObj
const renderChart = () => {
    if (!chartObj) {
        chartObj = echarts.init(chartDom.value)
    }
    const xData = dataList.map(item => item.statTime)
    let dataArr = []
    dataArr.push(dataList.map(item => item.cpuPercentage))
    dataArr.push(dataList.map(item => item.memoryPercentage))
    dataArr.push(dataList.map(item => item.bandwidth))

    max.value = 100
    const colors = ['rgb(116, 250, 242)', 'rgb(163, 233, 118)', 'rgb(76, 148, 237)']
    const legendNames = ['CPU', '内存', '带宽']
    const legendDates = colors.map((item, i) => {
        return {
            name: legendNames[i],
            icon: 'react', // 使用圆形作为图例项的图标
            textStyle: {
                fontSize: 8,
                color: item // 自定义折线1的文字颜色
            }
        }
    })
    const series = legendNames.map((item, i) => {
        return {
            name: item,
            type: 'line',
            smooth: true,
            symbol: 'none', // 不显示连接点
            yAxisIndex: i == 2 ? 1 : 0,
            lineStyle: {
                width: 2,
                shadowColor: colors[i],
                shadowBlur: 10
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1,
                    [{
                        offset: 0,
                        color: colorToRGBA(colors[i], .5)
                    },
                        {
                            offset: 1,
                            color: colorToRGBA(colors[i], .05)
                        }
                    ], false),

            },
            data: dataArr[i]
        }

    })

    function getYAxis(name, pos, format,) {
        return {
            name: name,
            type: 'value',
            position: pos,
            axisLabel: {
                show: true, fontSize: 8, color: '#a8b6c0',
                align: pos === 'left' ? 'right' : 'left',
                formatter: format
            },
            /*max: 100,
            interval: 25,*/
            axisLine: {show: false},
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'dashed',
                    color: '#162649',
                }
            }
        }
    }

    function getColor(color) {
        return {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
                {
                    offset: 0,
                    color: colorToRGBA(color, 0.2), // 0% 处的颜色
                },
                {
                    offset: 0.5,
                    color: color, // 0% 处的颜色
                },
                {
                    offset: 1,
                    color: colorToRGBA(color, 0.2),  // 0% 处的颜色
                },
            ],
        }
    }

    const option = {
        backgroundColor: 'transparent',
        color: [
            getColor(colors[0]),
            getColor(colors[1]),
            getColor(colors[2]),
        ],
        /*color: [props.color, props.color],*/
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            },
        },
        grid: {
            left: "5%",
            right: "5%",
            bottom: '0',
            top: '25',
            //top: '3',
            containLabel: true
        },
        legend: {
            data: legendDates,
            left: "center",
            icon: 'rect',
            itemWidth: 10,
            itemHeight: 6,
            top: 0,
            right: 15,
        },
        xAxis: {
            type: 'category',
            data: xData,
            axisTick: {show: false},
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'solid',
                    color: 'colorToRGBA(props.color, .3)',
                }
            },
            axisLine: {show: false},
            boundaryGap: true, // x轴左右流空间
            axisLabel: {show: true, fontSize: 8, color: '#a8b6c0'},
        },
        yAxis: [
            getYAxis('', 'left', (value, index) => {
                return value + '%'
            }),
            getYAxis('', 'right', (value, index) => {
                return value + 'Kbps'
            })
        ],
        series: series
    }

    chartObj.setOption(option)
}


window.addEventListener('resize', () => {
    chartObj && chartObj.resize();
})


watchEffect(() => {
    if (useCompSettingStoreHook().pageIndex && chartObj) {
        setTimeout(() => {
            chartObj && chartObj.resize();
        }, 100)
    }
    if (dataList.length) {
        setTimeout(() => {
            renderChart()
        }, 500)
    }
})

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

.chart-wrap {

}

.chart {
}

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
    font-size: .16rem;
}

</style>
