<template>
    <div class="flex-col com-container">
        <div class="title">
            <h3>已截止任务平均得分折线图</h3>
            <div class="line">
                <img src="@/assets/imgs/1/icon9.png" alt="">
            </div>
        </div>
        <div class="chart flex-1" ref="chartDom1">
        </div>
        <div class="title" style="margin-top: .2rem">
            <h3>已截止任务平均得分折线留</h3>
            <div class="line">
                <img src="@/assets/imgs/1/icon9.png" alt="">
            </div>
        </div>

        <div class="chart flex-1" ref="chartDom2">
        </div>
        <div class="title-2" style="margin-top: .2rem">
            <h3>场景统计</h3>
            <div>
                <span>场景总数</span>
                <number count-num="1024" :bg-style="{}" color="#53aaca"
                        font-size=".35rem" :maxLen="10"/>
            </div>
        </div>
        <div class="chart flex-2" ref="chartDom3">
        </div>
    </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import Number from "@/views/visual/components/Number.vue";
import * as echarts from "echarts";

const props = defineProps({
    color: {
        type: String,
        default: '#33b3d5'
    }
})

const chartDom1 = ref(null)
const chartDom2 = ref(null)
const chartDom3 = ref(null)

onMounted(() => {
    setTimeout(() => {
        renderChart(chartDom1.value, '#5fc8d0')
        renderChart(chartDom2.value, '#dc906d')
        renderChart2(chartDom3.value)
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

const renderChart = (chartDom, color) => {
    const chartObj = echarts.init(chartDom)
    const data = new Array(6).fill(null).map((item, i) => {
        return {
            value: Math.ceil(Math.random() * 200) + 100,
        }
    })
    const xData = ['11:00', '12:00', '13:00', '14:00', '15:00', '16:00']

    const option = {
        backgroundColor: 'transparent',
        color: color,
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '5',
            right: '5',
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
                    show: true,
                    color: color,
                    fontSize: 8
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
                symbolSize: 2, //标记的大小
                itemStyle: {
                    borderColor: color, // 设置symbol的边框颜色为蓝色
                    borderWidth: 1, // 设置symbol的边框宽度
                    shadowColor: color,
                    shadowBlur: 2
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


const renderChart2 = (chartDom) => {
    const chartObj = echarts.init(chartDom)

    let icon = utils.requireImg('@/assets/imgs/1/icon8.png')
    let xdata = {
        value: ['刘亦菲', '赵丽颖', '刘诗诗', '高圆圆', '古力娜', '李诗诗', '赵丽颖', '刘诗诗', '高圆圆',]
    };
    let sdata = {
        value: [10, 40, 30, 40, 50, 38, 40, 30, 40]
    }
    let max = Math.max(...sdata.value)
    if (max < 60) {
        max = 60
    }
    let series_sdata = [];
    let colors = []
    sdata.value.forEach((v, k) => {
        let item = {
            value: v,
            itemStyle: {
                color: colors[k]
            }
        }
        series_sdata.push(item);
    })


    let option = {
        /*tooltip: {
            trigger: 'axis',
            backgroundColor: '#081429',
            textStyle: {
                color: '#fff',
            },
            borderColor: "rgba(255,255,255,.2)",
            axisPointer: {
                lineStyle: {
                    color: "rgba(255,255,255,.1)"
                },
            }
        },*/
        tooltip: {
            trigger: 'axis',
            formatter(params) {
                return `${xdata.value[params[0].dataIndex]}<br/>${sdata.value[params[0].dataIndex]}`
            },
            axisPointer: {
                // 坐标轴指示器，坐标轴触发有效
                type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
                color: "rgba(255,255,255,.1)"
            }
        },
        grid: {
            containLabel: true,
            // 边距自行修改
            bottom: '1',
            left: '0',
            top: '5',
            right: '0',
        },
        yAxis: {
            type: 'value',
            max: max,
            axisLabel: {
                show: false,
            },
            axisLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            splitLine: {
                show: false,
            },
        },
        xAxis: [
            {
                type: 'category',
                data: sdata.value,
                inverse: false,
                axisLabel: {
                    fontSize: 8,
                    color: '#D6E0FC',
                },
                axisTick: {show: false},
                axisLine: {show: false},
                splitLine: {show: false},
            }
        ],
        series: [
            {
                data: sdata.value,
                type: 'bar',
                barWidth: 14,
                showBackground: true,
                backgroundStyle: {
                    color: 'rgba(40, 60, 105,0)',
                    borderRadius: 4,
                },
                itemStyle: {
                    borderRadius: 4,
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 1,
                        x2: 0,
                        y2: 0,
                        colorStops: [
                            {
                                offset: 0,
                                color: '#192a56', // 0% 处的颜色
                            },
                            {
                                offset: 1,
                                color: '#4d80ec', // 0% 处的颜色
                            },
                        ],
                        global: false, // 缺省为 false
                    }
                },
                label: {
                    show: true, // 显示label文字
                    position: 'insideTop', // 设置label在柱子内部显示
                    color: '#fff', // 设置label文字颜色
                    fontSize: 8, // 设置label文字大小
                    fontWeight: 'bold', // 设置label文字粗细
                    formatter: (data) => {
                        return `{b|${xdata.value[data.dataIndex].split('').join('\n')}}`
                    },
                    rich: {
                        b: {
                            fontSize: 6,
                            color: '#D6E0FC',
                            rotate: 45,
                        }
                    },
                },
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
.com-container {
    padding: .08rem;
}

.title {
    display: flex;
    align-items: flex-start;
    margin-bottom: .05rem;

    h3 {
        font-size: .22rem;
        transform: scale(.7);
        transform-origin: left center;
    }

    .line {
        flex: 1;
        margin-left: -.6rem;
        margin-top: .06rem;
        position: relative;

        &:before {
            display: block;
            content: '';
            height: 0.005rem;
            background: #efefef;
            margin-right: .46rem;
            opacity: .8;
        }

        img {
            float: right;
            width: .4rem;
            margin-top: -.02rem;

        }
    }
}

.title-2 {
    display: flex;
    justify-content: space-between;

    h3 {
        font-weight: normal;
        font-size: .22rem;
        transform: scale(.9);
        transform-origin: left center;
    }

    > div {
        padding-right: .15rem;
        line-height: .16rem;
        border-right: .05rem solid #53aaca;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        > span {
            font-size: .2rem;
            transform: scale(.7);
        }

        > div {
            margin: .1rem 0 -.08rem 0;
        }
    }

}
</style>
