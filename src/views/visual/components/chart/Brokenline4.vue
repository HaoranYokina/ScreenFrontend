<template>
    <div class="flex-col h-100" style="padding: .05rem .01rem .1rem .05rem">
        <div>
            <div class="instance-cnt">
                <a-line/>
                <number :count-num="countNum" title="课程总数"/>
            </div>
        </div>
        <h3 class="title">老师平均开设课程数折线图</h3>
        <div class="flex-1 chart-wrap">
            <div class="chart h-100" ref="chartDom1">
            </div>
        </div>
        <h3 class="title">课程总未截止任务数折线图</h3>
        <div class="flex-1 chart-wrap">
            <div class="chart h-100" ref="chartDom2">
            </div>
        </div>
        <h3 class="title">课程平均学生人数折线图</h3>
        <div class="flex-1 chart-wrap">
            <div class="chart h-100" ref="chartDom3">
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import ALine from "@/views/visual/components/ALine.vue";
import {onMounted, ref} from "vue";
import Number from "@/views/visual/components/Number.vue";
import * as echarts from "echarts";

const chartDom1 = ref(null)
const chartDom2 = ref(null)
const chartDom3 = ref(null)
const countNum = ref(9)

const props = defineProps({
    color: {
        type: String,
        default: '#33b3d5'
    }
})

const t = setInterval(() => {
    countNum.value *= 2
    if (countNum.value > 99900) {
        //clearInterval(t)
        countNum.value = 3
    }
}, 3100)


onMounted(() => {
    setTimeout(() => {
        renderChart(chartDom1.value)
        renderChart(chartDom2.value)
        renderChart(chartDom3.value)
    }, 200)
})

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

const renderChart = (chartDom) => {
    const chartObj = echarts.init(chartDom)
    const data = new Array(6).fill(null).map((item, i) => {
        return {
            value: Math.ceil(Math.random() * 200) + 100,
            symbol: i > 0 && i !== 5 ? 'circle' : 'none', // 控制连接点是否显示
            symbolSize: 7, //标记的大小
            itemStyle: {
                color: '#ffffff', // 设置symbol的颜色为白色
                borderColor: '#4a7ee9', // 设置symbol的边框颜色为蓝色
                borderWidth: 1, // 设置symbol的边框宽度
                shadowColor: props.color,
                shadowBlur: 2
            },
        }
    })
    const xData = ['11:00', '12:00', '13:00', '14:00', '15:00', '16:00']

    const option = {
        backgroundColor: 'transparent',
        color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
                {
                    offset: 0,
                    color: colorToRGBA(props.color, 0.2), // 0% 处的颜色
                },
                {
                    offset: 0.5,
                    color: props.color, // 0% 处的颜色
                },
                {
                    offset: 1,
                    color: colorToRGBA(props.color, 0.2),  // 0% 处的颜色
                },
            ],
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '0',
            right: '0',
            bottom: '5',
            top: '5',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: xData,
                axisTick: {show: false},
                splitLine: {
                    show: false,
                    lineStyle: {
                        type: 'solid',
                        color: colorToRGBA(props.color, .3),
                    }
                },
                axisLine: {show: false},
                boundaryGap: false,
                axisLabel: {
                    show: false
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                axisLabel: {show: false},
                axisLine: {show: false},
                splitLine: {
                    show: false,
                    lineStyle: {
                        type: 'solid',
                        color: colorToRGBA(props.color, .3),
                    }
                }
            }
        ],
        series: [
            {
                name: '收入统计',
                type: 'line',
                smooth: false,
                symbol: 'circle', // 不显示连接点
                symbolSize: 7, //标记的大小
                lineStyle: {
                    width: 2,
                    shadowColor: props.color,
                    shadowBlur: 10
                },
                data: data
            }
        ]
    }


    chartObj.setOption(option)

    window.addEventListener('resize', () => {
        chartObj.resize();
    })

    window.addEventListener('resize', () => {
        chartObj.resize();
    })
}


</script>

<style scoped lang="scss">

.instance-cnt {
    width: 100%;
    height: .5rem;
    position: relative;

    > div {
        position: absolute;
        top: -.14rem;
        left: .4rem;
        right: .3rem;
        display: flex;
        align-items: center;
        justify-content: space-between;

        > h3 {
            font-size: .12rem;
        }

        > div.cnt {
            font-size: .38rem;
            display: flex;

            span {
                display: block;
                box-shadow: 0 0 10px rgba(76, 97, 131, 0.9) inset;
                margin-left: .03rem;
                border-radius: .05rem;
                padding: .05rem;
            }
        }
    }
}

h3.title {
    margin-top: .2rem;
    margin-bottom: .1rem;
    font-weight: normal;
    font-size: .2rem;
    transform-origin: left center;
    transform: scale(.7);
}

.chart-wrap {
    border-radius: .2rem;
    background: rgba(35, 112, 241, 0.12);
    position: relative;

    &:before {
        position: absolute;
        content: ' ';
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: red;
        border-radius: .2rem;
        background: linear-gradient(to right, rgba(65, 91, 166, 0.3) 0.01rem, transparent 0) 0 -.2rem/.25rem 100%,
        linear-gradient(rgba(65, 91, 166, 0.3) 0.01rem, transparent 0) 0 -1px/100% .15rem;
        background-position: -.01rem 0.1rem;
        pointer-events: none;
    }

    &:after {
        position: absolute;
        z-index: 3;
        content: ' ';
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        box-shadow: 0 0 .18rem .03rem #1a4cab inset;
        border-radius: .2rem;
        pointer-events: none;
    }
}

.chart {
}
</style>
