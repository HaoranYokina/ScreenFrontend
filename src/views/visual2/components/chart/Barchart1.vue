<template>
    <div class="flex-col h-100">
        <div class="flex-1 chart" ref="chartDom">
        </div>
    </div>
</template>

<script setup lang="ts">
import {onMounted, ref, watchEffect} from "vue";
import * as echarts from "echarts";
import {useSettingStoreHook} from "@/store/modules/setting";

const props = defineProps({
    color: {
        type: String,
        default: '#33b3d5'
    },
    dataList: {
        type: [Array<{ key: string, value: any }>],
        default: []
    }
})

const chartDom = ref(null)


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
    let xdata = props.dataList.map(item => item.key)
    let sdata = props.dataList.map(item => item.value)

    let max = Math.max(...sdata)
    max += 10
    let series_sdata = [];
    let colors = [['#5fc0d7', '#8aeffc'], ['#ec87b4', '#f4aec8'], ['#6798f0', '#9ed6fa'], ['#eebc49', '#f9e362'], ['#7ec566', '#b7fa92']]
    sdata.forEach((v, k) => {
        let item = {
            value: v,
            itemStyle: {
                //color: colors[k],
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 1,
                    y2: 0,
                    colorStops: [
                        {
                            offset: 0,
                            color: colors[k] ? colors[k][0] : colors[0][0], // 0% 处的颜色
                        },
                        {
                            offset: 1,
                            color: colors[k] ? colors[k][1] : colors[0][1], // 0% 处的颜色
                        },
                    ],
                    global: false, // 缺省为 false
                }
            },
        }
        series_sdata.push(item);
    })

    function getPRichs() {
        const richs = {}
        xdata.forEach((item, i) => {
            richs[`p${i}`] = {
                fontSize: 9,
                color: colors[i]?.[0] ?? '#73E3FF',
                padding: [4, 0, 26, 5],
            }
        })
        return richs
    }

    function getARichs() {
        const richs = {}
        sdata.forEach((item, i) => {
            richs[`a${i}`] = {
                width: 8,
                height: 8,
                borderRadius: 25,
                backgroundColor: colors[i]?.[1] ?? '#73E3FF',
                shadowBlur: 5,
                shadowColor: colors[i]?.[1] ?? '#73E3FF',
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
            left: '0',
            top: '0',
            right: '8',
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
                data: xdata,
                inverse: true,
                axisLabel: {
                    inside: true,
                    margin: -5,       //刻度标签与轴线之间的距离
                    formatter: function (value, index) {
                        return `{p${index}|${value}}`
                    },
                    rich: {
                        ...getPRichs(),
                    },
                },
                axisLine: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
                splitLine: {
                    show: false,
                    lineStyle: {
                        color: '#13387a',
                    },
                },
            },
            {
                type: 'category',
                axisTick: "none",
                axisLine: "none",
                position: "left",
                inverse: true,
                axisLabel: {
                    verticalAlign: 'bottom',
                    lineHeight: 13,
                    margin: 20,
                    textStyle: {
                        color: "#fff",
                        fontSize: 22,
                        fontWeight: "300",
                    },
                },
                data: sdata,
            },
            /*{
                type: 'category',
                data: sdata.value,
                inverse: true,
                axisLabel: {
                    inside: true,
                    verticalAlign: 'bottom',
                    lineHeight: 14,
                    margin: 0,       //刻度标签与轴线之间的距离
                    formatter: function (value, index.ts) {
                        return `{a|总数：${sdata.value[index.ts]}}`
                    },
                    rich: {
                        a: {
                            fontSize: 9,
                            color: '#efefef',
                            padding: [4, 1, 15, 0],
                        }
                    },
                },
                axisLine: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
                splitLine: {
                    show: false,
                    lineStyle: {
                        color: '#13387a',
                    },
                },
            }*/
        ],
        series: [
            {
                data: series_sdata,
                type: 'bar',
                barWidth: 3,
                showBackground: true,
                backgroundStyle: {
                    color: '#46526c',
                    borderRadius: 40,
                },
                itemStyle: {
                    borderRadius: 40,
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 1,
                        y2: 0,
                        colorStops: [
                            {
                                offset: 0,
                                color: '#148BCE', // 0% 处的颜色
                            },
                            {
                                offset: 1,
                                color: '#73E3FF', // 0% 处的颜色
                            },
                        ],
                        global: false, // 缺省为 false
                    }
                },
                label: {
                    show: true,
                    position: 'insideRight',
                    distance: -5,
                    formatter: (data) => {
                        return `{z|}{a${data.dataIndex}|}`
                    },
                    rich: {
                        a: {
                            width: 8,
                            height: 8,
                            borderRadius: 25,
                            backgroundColor: 'rgb(103, 206, 236)',
                            shadowBlur: 15,
                            shadowColor: 'rgba(0, 0, 0, 1)',
                            shadowOffsetX: 2,
                            shadowOffsetY: 2,
                        },
                        ...getARichs()
                    }
                }
            }
        ],
        //animationDuration: 1000
    }

    chartObj.setOption(option)


}

window.addEventListener('resize', () => {
    chartObj && chartObj.resize();
})

watchEffect(() => {
    if (useSettingStoreHook().pageIndex && chartObj) {
        setTimeout(() => {
            chartObj && chartObj.resize();
        }, 100)
    }
    if (props.dataList.length) {
        setTimeout(() => {
            renderChart()
        }, 300)
    }
})
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
