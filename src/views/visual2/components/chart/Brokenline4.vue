<template>
    <div class="flex-col h-100" style="padding: .05rem .01rem .1rem .05rem">
        <h3 class="title">
            <em class="v-line" :style="{backgroundColor:props.color}"></em>
            <span>{{ props.title }}</span>
            <div class="point">
                <span :style="{backgroundColor:props.color}"></span>
                <span :style="{backgroundColor:props.color}"></span>
                <span :style="{backgroundColor:props.color}"></span>
            </div>
        </h3>
        <div class="top-number-wrap">
            <label>峰值：</label>
            <!--<span :style="{color:props.color}">阶段六 总数 30</span>-->
            <span :style="{color:props.color}">{{ max?.key }} 总数 {{ max?.value }}</span>
        </div>
        <div class="flex-1 chart-wrap">
            <div class="chart h-100" ref="chartDom">
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {onMounted, ref, watchEffect} from "vue";
import * as echarts from "echarts";
import {useSettingStoreHook} from "@/store/modules/setting";

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
    dataList: {
        type: [Array<{ key: string, value: any }>],
        default: []
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
    const xData = props.dataList.map(item => item.key)
    let data = props.dataList.map(item => item.value)
    max.value = props.dataList.reduce((prev, curr) => {
        return prev.value > curr.value ? prev : curr;
    })
    const option = {
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
            bottom: '0',
            top: '5',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: xData,
            axisTick: {show: false},
            splitLine: {
                show: false,
                lineStyle: {
                    type: 'solid',
                    color: 'colorToRGBA(props.color, .3)',
                }
            },
            axisLine: {show: false},
            boundaryGap: true, // x轴左右流空间
            axisLabel: {show: true, fontSize: 8, color: '#e6f5fa'},
        },
        yAxis: {
            type: 'value',
            //splitNumber: 5, //分割数
            //interval: 50, // 间隔数
            axisLabel: {
                show: true, fontSize: 8, color: '#e6f5fa',
                align: 'right',
                /*formatter: function (value, index.ts) {
                    return value == 0 ? '' : value
                }*/
            },
            axisLine: {show: false},
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'dashed',
                    color: '#162649',
                }
            }
        },
        series: [
            {
                name: '',
                type: 'line',
                smooth: false,
                symbol: 'circle', // 控制连接点是否显示
                symbolSize: 6, //标记的大小
                itemStyle: {
                    color: '#091e44', // 设置symbol的颜色为白色
                    borderColor: props.color, // 设置symbol的边框颜色为蓝色
                    borderWidth: 1, // 设置symbol的边框宽度
                    shadowColor: props.color,
                    shadowBlur: 1
                },
                lineStyle: {
                    color: props.color,
                },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1,
                        [{
                            offset: 0,
                            color: colorToRGBA(props.color, .2)
                        },
                            {
                                offset: 1,
                                color: colorToRGBA(props.color, .05)
                            }
                        ], false),
                    /*shadowColor:  colorToRGBA(props.color,.1),
                    shadowBlur: 10*/
                },
                data: data
            }
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

.chart-wrap {

}

.chart {
}

.top-number-wrap {
    padding: .2rem 0 .3rem 0;
    font-size: .2rem;
    transform: scale(.66);
    transform-origin: left center;
}

.title {
    position: relative;
    padding-left: .24rem;
    font-size: .2rem;
    font-weight: 400;
    display: flex;
    justify-content: space-between;

    span {
        transform: scale(.9);
        transform-origin: left center;
    }

    .v-line {
        position: absolute;
        content: '';
        left: 0;
        top: 50%;
        width: .05rem;
        height: .15rem;
        background: rgb(138, 239, 251);
        transform: translateY(-50%);
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
</style>
