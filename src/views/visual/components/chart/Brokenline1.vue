<template>
    <div class="flex">
        <div class="left flex-col">
            <p class="title text-scale-7">{{ title }}</p>
            <img :src="icon" alt="" class="icon">
            <div class="number flex" :style="{color,borderLeft:`.06rem solid ${color}`,height: '.28rem'}">
                <number count-num="1024" :bg-style="{}" :color="color"
                        font-size=".35rem" :maxLen="10"/>
                <!--<AnimatedNumber :from="0" :to="1000"></AnimatedNumber>-->
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
    },
    titleIcon: {
        default: utils.requireImg('@/assets/imgs/1/a.png')
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
        title: {
            //text: props.subTitle,
            show: true,
            text: ` {titleIcon|}  ${props.subTitle}`,
            x: 'right',
            textStyle: {
                color: '#ffffff',
                fontSize: 8.8,
                rich: {
                    titleIcon: {
                        backgroundColor: {
                            image: props.titleIcon
                        },
                        height: 6,
                        width: 8,
                    }
                }
            },

        },
        grid: {
            left: '5',
            right: '10',
            bottom: '0',
            top: '22',
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

const icon = utils.requireImg(props.icon)
</script>

<style scoped lang="scss">
.left {
    position: relative;
    justify-content: center;
    align-items: center;
    padding-top: .4rem;
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
    margin-left: .2rem;
    margin-right: -.2rem;
    /* background: rgba(100, 100, 100, .2);*/
}

.icon {
    width: 1rem;
}

.number {
    margin-top: .3rem;
    padding-left: .15rem;
    font-size: .35rem;
    line-height: .1rem;
    font-weight: bold;
}
</style>
