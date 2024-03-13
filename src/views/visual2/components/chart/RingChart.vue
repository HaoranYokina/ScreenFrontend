<template>
    <div class="flex-col">
        <div class="chart" ref="chartDom"></div>
        <h3>{{ props.title }}</h3>
    </div>
</template>

<script setup lang="ts">
import {onMounted, ref, watchEffect} from "vue";
import * as echarts from "echarts";
import {useDataStoreHook} from "@/store/modules/data";
import {useSettingStoreHook} from "@/store/modules/setting";

const options = useDataStoreHook().instances
const dataStore = useDataStoreHook()

const chartDom = ref(null)

const props = defineProps({
    color: {
        type: String,
        default: '#33b3d5'
    },
    title: {
        type: String
    },
    data: {
        type: Object,
        default: {cnt: 0}
    }
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

let chartObj
const renderChart = () => {
    if (!chartObj) {
        chartObj = echarts.init(chartDom.value)
    }
    const value = props.data.cnt
    const rate = value + '%'
    let option = {
        title: {
            text: rate,
            left: 'center',
            top: '42%',
            itemGap: 0,
            textStyle: {
                color: '#fff',
                fontSize: '12',
            }
        },
        angleAxis: {
            max: 100,
            // 隐藏刻度线
            show: false,
            startAngle: 90
        },
        radiusAxis: {
            type: 'category',
            show: true,
            axisLabel: {
                show: false,
            },
            axisLine: {
                show: false,
            },
            axisTick: {
                show: false
            },
        },
        polar: {
            radius: '150%' //图形大小
        },
        series: [{
            type: 'bar',
            data: [value],
            showBackground: true,
            roundCap: true,
            backgroundStyle: {
                color: '#113152',
            },
            coordinateSystem: 'polar',
            barWidth: 4,
            itemStyle: {
                normal: {
                    color: props.color,
                    shadowBlur: 10,
                    shadowColor: props.color
                }
            },
        }]
    }

    chartObj.setOption(option)
}


window.addEventListener('resize', () => {
    chartObj && chartObj.resize()
})
onMounted(() => {
    setTimeout(() => {
        renderChart()
    }, 100)
})

watchEffect(() => {
    if (useSettingStoreHook().pageIndex) {
        setTimeout(() => {
            chartObj && chartObj.resize()
        }, 300)
    }
    if (props.data) {
        setTimeout(() => {
            renderChart()
        }, 300)
    }
})
</script>

<style scoped lang="scss">
.chart-wrap {
    display: flex;
    margin-top: .3rem;

    > div {
        flex: 1;
        display: flex;
        flex-direction: column;
        text-align: center;
        font-size: .25rem;

        .chart {
            flex: 1;
        }

        &:first-of-type {
            .chart {
            }
        }
    }
}
</style>
