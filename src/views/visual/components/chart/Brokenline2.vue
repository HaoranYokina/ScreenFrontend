<template>
    <div class="flex-col h-100">
        <!--      <BLine/>-->
        <div class="top">
            <BLine :line-color="props.color"/>
            <div class="title">
                {{ title }}
            </div>
            <div class="number-box" :style="{background:props.color}">
                <number count-num="982" :bg-style="{}" color="#fff"
                        font-size=".36rem" :maxLen="10"/>
                <span>次</span>
            </div>
        </div>
        <div class="flex-1 chart" ref="chartDom">
        </div>
    </div>
</template>

<script setup lang="ts">
import BLine from "@/views/visual/components/BLine.vue";
import Number from "@/views/visual/components/Number.vue";
import * as echarts from "echarts"
import {onMounted, ref} from "vue";

const chartDom = ref(null)
const props = defineProps({
    title: {
        type: String,
        default: '运行虚拟设备总数'
    },
    subTitle: {
        type: String,
        default: '运行虚拟设备趋势图'
    },
    icon: {
        type: String,
        default: '@/assets/imgs/1/icon1.png'
    },
    color: {
        type: String,
        default: '#33b3d5'
    }
})

onMounted(() => {
    setTimeout(() => {
        renderChart()
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

const renderChart = () => {
    const chartObj = echarts.init(chartDom.value)
    const data = new Array(6).fill(null).map(item => {
        return {
            value: Math.ceil(Math.random() * 200) + 100
        }
    })
    const xData = ['11:00', '12:00', '13:00', '14:00', '15:00', '16:00']

    let option = {
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
            right: '10',
            bottom: '0',
            top: '10',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: xData,
                axisTick: {
                    show: false // 不显示坐标轴刻度线
                },
                splitLine: {
                    show: false,
                },
                axisLine: {
                    show: true, // 轴线
                    lineStyle: {
                        color: colorToRGBA(props.color, .5) // 设置y轴线的颜色
                    }
                },
                boundaryGap: false, // 左侧右侧留白空间
                axisLabel: {
                    color: props.color,
                    fontSize: 8,
                    interval: 0,
                    margin: 10,
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                //y右侧文字
                axisLabel: {
                    color: props.color,
                    fontSize: 8
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: colorToRGBA(props.color, .5) // 设置y轴线的颜色
                    }
                },
                // y轴的分割线
                splitLine: {
                    show: true,
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
                smooth: true,
                symbol: 'none', // 不显示连接点
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        // 坐标轴指示器，坐标轴触发有效
                        type: 'line' // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                lineStyle: {
                    width: 2,
                    shadowColor: props.color,
                    shadowBlur: 10
                },
                areaStyle: {
                    opacity: 1,
                    //右下左上
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: colorToRGBA(props.color, .2)
                        },
                        /*{
                           offset: .5,
                           color: colorToRGBA(props.color,.5)
                        },
                        {
                           offset: 1,
                           color: colorToRGBA(props.color,.2)
                        }*/
                    ])
                },
                data: data
            }
        ]
    }


    chartObj.setOption(option)

    window.addEventListener('resize', () => {
        chartObj.resize();
    })
}

</script>

<style scoped lang="scss">
.top {
    position: relative;

    .title {
        position: absolute;
        left: .35rem;
        top: -.15rem;
        width: initial;
        font-size: .2rem;
        transform: scale(.7);
        transform-origin: left center;
    }

    .number-box {
        position: absolute;
        right: 0;
        top: -.15rem;
        padding: 0 .2rem;
        height: .42rem;
        color: #FFFFFF;
        border-radius: 3rem;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        font-weight: bold;
        overflow: hidden;

        span {
            font-size: .2rem;
            margin-bottom: .05rem;
            font-weight: 100;
            transform: scale(.8);
            transform-origin: right center;
        }
    }
}

.title {
    position: absolute;
    width: 200%;
    top: 0;
    left: -.13rem;
    font-size: .2rem;
    text-align: center;
}

.chart {
    margin-right: -.1rem;
    /* background: rgba(100, 100, 100, .2);*/
}

.number {
    margin-top: .3rem;
    padding-left: .15rem;
    font-size: .35rem;
    line-height: .1rem;
    font-weight: bold;
}
</style>
