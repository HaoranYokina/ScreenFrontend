<template>
    <div class="container h-100 flex-col">
        <div class="chart flex-1" ref="chartDom">
        </div>
    </div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import {ref, watchEffect} from "vue";
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

let chartObj
const renderChart = () => {
    if (!chartObj) {
        chartObj = echarts.init(chartDom.value)
    }
    let colors = ['#43a9f1', '#fbc51d', '#ff9064', '#4bf5cc', '#fb73ae', '#1470ef', '#59c14a', '#511dd5']
    let xdata = props.dataList.map(item => item.key)
    let sdata = props.dataList.map(item => item.value)
    let realMax = Math.max(...sdata)
    let max = realMax + 10

    const getRichs = () => {
        return sdata.reduce((obj, item, i) => {
            obj[`p${i}`] = {
                width: 5,
                height: 5,
                backgroundColor: colors[i] ?? '#511dd5'
            }
            return obj
        }, {})
    }
    const getLabel = (index) => {
        let val = sdata[index]
        if (realMax / val > 5) {
            return ''
        }
        return xdata[index].split('').join('\n')
    }
    let option = {
        tooltip: {
            trigger: 'axis',
            formatter(params) {
                return `${xdata[params[0].dataIndex]}<br/>${sdata[params[0].dataIndex]}`
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
                data: sdata,
                inverse: false,
                axisLabel: {
                    fontSize: 8,
                    color: '#D6E0FC',
                    formatter: function (value, index) {
                        return `{p${index}|}`
                    },
                    rich: {
                        p: {
                            width: 4,
                            height: 4,
                            backgroundColor: '#73E3FF'
                        },
                        ...getRichs()
                    }
                },
                axisTick: {show: false},
                axisLine: {show: false},
                splitLine: {show: false},
            },
        ],
        series: [
            {
                data: sdata,
                type: 'bar',
                barWidth: 22,
                showBackground: true,
                backgroundStyle: {
                    color: 'rgba(40, 60, 105,0)',
                    borderRadius: 4,
                },
                itemStyle: {
                    borderRadius: [6, 6, 4, 4],
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
                        return `{b|${getLabel(data.dataIndex)}}`
                    },
                    rich: {
                        b: {
                            fontSize: 8,
                            color: '#D6E0FC',
                            rotate: 45,
                        }
                    },
                },
            },
            {
                name: '总量',
                type: 'scatter',
                label: {
                    normal: {
                        show: true,
                        position: 'top',
                        formatter: '{c}',
                        lineHeight: 2,
                        textStyle: {
                            color: '#ffffff'
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        color: 'rgba(128, 128, 128, 0)'
                    }
                },
                data: sdata
            },
        ]
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

</style>
