<template>
    <div class="flex-col h-100">
        <div>
            <div class="instance-cnt">
                <a-line/>
                <number :count-num="countNum" title="运行实例总数"/>
            </div>
            <div class="data-state">
                <div>
                    <img src="@/assets/imgs/1/icon4.png" alt="" class="icon">
                    <div class="title-wrap">
                        <span class="title text-scale-6 text-scale-center">个人任务实例总数</span>
                    </div>
                    <span class="value one">
                   <number count-num="300" :bg-style="{}" color="rgba(82, 166, 193, 1)"
                           font-size=".36rem" :maxLen="10"/>
                </span>
                </div>
                <div>
                    <img src="@/assets/imgs/1/icon5.png" alt="" class="icon">
                    <div class="title-wrap">
                        <span class="title text-scale-6 text-scale-center">个人任务实例总数</span>
                    </div>
                    <span class="value two">
                   <number count-num="300" :bg-style="{}" color="rgba(242, 166, 141, 1)"
                           font-size=".36rem" :maxLen="10"/>
                </span>
                </div>
                <div>
                    <img src="@/assets/imgs/1/icon6.png" alt="" class="icon">
                    <div class="title-wrap">
                        <span class="title text-scale-6 text-scale-center">个人任务实例总数</span>
                    </div>
                    <span class="value three">
                   <number count-num="19283" :bg-style="{}" color="rgba(238, 182, 82, 1)"
                           font-size=".36rem" :maxLen="10"/>
                </span>
                </div>
            </div>
        </div>

        <div class="flex-1 chart" ref="chartDom">

        </div>
    </div>
</template>

<script setup lang="ts">
import ALine from "@/views/visual/components/ALine.vue";
import {onMounted, ref} from "vue";
import Number from "@/views/visual/components/Number.vue";
import * as echarts from "echarts";

const chartDom = ref(null)
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
    let icon = utils.requireImg('@/assets/imgs/1/icon8.png')
    let xdata = {
        value: ['刘亦菲', '赵丽颖', '刘诗诗', '高圆圆', '古力娜', '李诗诗']
    };
    let sdata = {
        value: [10, 40, 30, 40, 50, 38]
    }
    let max = Math.max(...sdata.value)
    if (max < 100) {
        max = 100
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

    function getPRichs() {
        const richs = {}
        xdata.value.forEach((item, i) => {
            richs[`p${i}`] = {
                width: 4,
                height: 4,
                verticalAlign: 'middle',
                lineHeight: 15,
                backgroundColor: colors[i] ?? '#73E3FF'
            }
        })
        return richs
    }

    let option = {
        tooltip: {
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
        },
        grid: {
            containLabel: true,
            // 边距自行修改
            bottom: '0',
            left: '5',
            top: '5',
            right: '5',
        },
        xAxis: {
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
        yAxis: [
            {
                type: 'category',
                data: xdata.value,
                inverse: true,
                axisLabel: {
                    fontSize: 8,
                    formatter: function (value, index) {
                        return `{p|} {a|${value}}`
                    },
                    rich: {
                        p: {
                            width: 10,
                            height: 6,
                            verticalAlign: 'middle',
                            lineHeight: 15,
                            backgroundColor: {
                                image: icon
                            }
                        },
                        a: {
                            fontSize: 8,
                            color: '#D6E0FC',
                            padding: [0, 0, 0, 5],
                        },
                        ...getPRichs(),
                    },
                },
                axisTick: {show: false},
                axisLine: {show: false},
                splitLine: {show: false},
            },
            {
                gridIndex: 0,
                type: 'category',
                inverse: true,
                margin: 20,
                data: sdata.value,
                axisTick: {show: false},
                axisLine: {show: false},
                splitLine: {show: false},
                axisLabel: {
                    fontSize: 8,
                    padding: [0, 0, 0, 1],
                    formatter: (_, index) => {
                        return `{value|总数: ${sdata.value[index]}}`;
                    },
                    rich: {
                        value: {
                            color: '#fff',
                            fontSize: 8,
                            fontWeight: 500,
                        },
                    },
                },
            },
        ],
        series: [
            {
                data: sdata.value,
                type: 'bar',
                barWidth: 15,
                showBackground: true,
                backgroundStyle: {
                    color: 'rgb(40, 60, 105)',
                    borderRadius: 4,
                },
                itemStyle: {
                    borderRadius: 4,
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 1,
                        y2: 0,
                        colorStops: [
                            {
                                offset: 0,
                                color: 'rgb(41, 60, 96)', // 0% 处的颜色
                            },
                            {
                                offset: 1,
                                color: 'rgb(91, 137, 237)', // 0% 处的颜色
                            },
                        ],
                        global: false, // 缺省为 false
                    }
                },
                /*label: {
                   show: true, // 显示label文字
                   position: 'insideRight', // 设置label在柱子内部显示
                   color: '#fff', // 设置label文字颜色
                   fontSize: 8, // 设置label文字大小
                   fontWeight: 'bold', // 设置label文字粗细
                },*/
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

.data-state {
    display: flex;
    color: #FFFFFF;
    justify-content: space-between;
    padding: .31rem 0 0 0;
    margin: 0 -.18rem;

    > div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 1;

        img {
            width: 1rem;
        }

        .title-wrap {
            width: 100%;
            height: .25rem;
            overflow: hidden;
            position: relative;
            margin-top: .12rem;
        }

        .title {
            position: absolute;
            left: 50%;
            top: 0;
            font-size: .18rem;
            width: 140%;
            text-align: center;
            transform: translateX(-50%) scale(.6);
        }

        .value {
            font-weight: 900;
            font-size: .36rem;
            margin-top: .08rem;

            &.one {
                color: rgba(82, 166, 193, 1);
            }

            &.two {
                color: rgba(242, 166, 141, 1);
            }

            &.three {
                color: rgba(238, 182, 82, 1);
            }

        }
    }
}

.chart {
    margin-top: .2rem;
    margin-bottom: .1rem;
    /*background: rgba(100, 100, 100, .2);*/
}
</style>
