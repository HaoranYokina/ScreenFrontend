<template>
    <div class="flex-col h-100">
        <div class="top">
            <div class="number-wrap">
                <div class="title">
                    <span class="dot"></span>
                    <div>在线总人数</div>
                </div>
                <number count-num="982" :bg-style="{margin:'0 .01rem'}" color="rgba(126, 198, 122)"
                        font-size=".36rem" :maxLen="10"/>
            </div>
            <div class="flex-sb">
                <div class="number-wrap">
                    <div class="title">
                        <span class="dot"></span>
                        <div>学生在线总数</div>
                    </div>
                    <number count-num="982" :bg-style="{margin:'0 .01rem'}" color="rgba(101, 148, 247)"
                            font-size=".36rem" :maxLen="10"/>
                </div>
                <div class="number-wrap">
                    <div class="title">
                        <span class="dot"></span>
                        <div>科研人员在线总数</div>
                    </div>
                    <number count-num="982" :bg-style="{margin:'0 .01rem'}" color="rgba(101, 148, 247)"
                            font-size=".36rem" :maxLen="10"/>
                </div>
                <div class="number-wrap">
                    <div class="title">
                        <span class="dot"></span>
                        <div>教师在线总数</div>
                    </div>
                    <number count-num="982" :bg-style="{margin:'0 .01rem'}" color="rgba(101, 148, 247)"
                            font-size=".36rem" :maxLen="10"/>
                </div>
            </div>
        </div>
        <div class="flex-1 chart" ref="chartDom">
        </div>
    </div>
</template>

<script setup lang="ts">
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
                    color: '#77a9fc', // 0% 处的颜色
                },
                {
                    offset: 1,
                    color: '#92dbe7', // 0% 处的颜色
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
                    show: false
                },
                splitLine: {
                    show: false,
                },
                axisLine: {
                    show: false
                },
                boundaryGap: false,
                axisLabel: {
                    color: '#efefef',
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
                    color: '#efefef',
                    fontSize: 8
                },
                axisLine: {
                    show: false
                },
                // y轴的分割线
                splitLine: {
                    show: false
                }
            }
        ],
        series: [
            {
                type: 'custom',
                renderItem: function (params, api) {
                    let position = api.coord([api.value(0), 0]); // 获取柱子底部的坐标点
                    let x = position[0];
                    let y = position[1];

                    return {
                        type: 'circle',
                        shape: {
                            cx: x,
                            cy: y,
                            r: 3
                        },
                        style: {
                            fill: '#eef0fa'
                        }
                    };
                },
                encode: {
                    x: 0,
                    y: 1,
                    z: 99
                },
                data: data
            },
            {
                name: '收入统计',
                type: 'line',
                smooth: true,
                symbol: 'circle', // 不显示连接点
                showAllSymbol: true, //显示所有图形。
                symbolSize: 1, //标记的大小
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
                data: data
            },
            {
                name: '回访数量',
                type: 'bar',
                barWidth: 0.1,
                itemStyle: {
                    normal: {
                        color: '#eef0fa',
                        barBorderRadius: 6,
                        borderWidth: 1, // 柱子的边框粗细
                        borderColor: 'rgba(100, 105, 119)', // 柱子的边框颜色
                    },
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

    .number-wrap {
        .title {
            position: relative;
            display: flex;
            align-items: center;

            > span {
                display: block;
                width: .13rem;
                height: .13rem;
                background: rgba(117, 191, 91);
                border-radius: 100%;
            }

            > div {
                font-size: .2rem;
                margin-left: .05rem;
                transform: scale(.7);
                transform-origin: left center;
            }
        }

        > div:nth-of-type(2) {
            margin-left: .05rem;
        }

    }

    > div:first-of-type {
        margin: .2rem 0 .2rem .16rem;
    }

    > div:last-of-type {
        margin: .2rem 0 .2rem .16rem;

        span.dot {
            background: rgba(101, 148, 247);
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
