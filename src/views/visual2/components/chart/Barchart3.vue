<template>
    <div class="flex-col h-100">
        <div class="line">
            <span></span>
        </div>
        <div class="stat-wrap">
            <StatNumber label="运行实例总数" bg-color="transparent" unit="例" box-shadow="none"
                        :cnt-num="useDataStoreHook().instanceStat.total"/>
            <div class="v-line"></div>
            <StatNumber3 label="个人总数" bg-color="transparent" unit="例"
                         :cnt-num="useDataStoreHook().instanceStat.totalPersonal"/>
            <StatNumber3 label="小组总数" bg-color="transparent" unit="例"
                         :cnt-num="useDataStoreHook().instanceStat.totalGroup"/>
            <StatNumber3 label="全体总数" bg-color="transparent" unit="例"
                         :cnt-num="useDataStoreHook().instanceStat.totalEveryone"/>
        </div>
        <div class="flex-1 chart" ref="chartDom">

        </div>
    </div>
</template>

<script setup lang="ts">
import StatNumber from "@/views/visual2/components/chart/StatNumber.vue";
import StatNumber3 from "@/views/visual2/components/chart/StatNumber3.vue";
import {ref, watchEffect} from "vue";
import * as echarts from "echarts";
import {useDataStoreHook} from "@/store/modules/data";
import {useSettingStoreHook} from "@/store/modules/setting";

const chartDom = ref(null)

const props = defineProps({
    color: {
        type: String,
        default: '#33b3d5'
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
    let icon = utils.requireImg('@/assets/imgs/2/icon5.png')
    let xdata = useDataStoreHook().instanceTags.map(item => item.key)
    let sdata = useDataStoreHook().instanceTags.map(item => item.value)
    let max = Math.max(...sdata)
    max += 5
    let series_sdata = [];
    let colors = []
    sdata.forEach((v, k) => {
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
        xdata.forEach((item, i) => {
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
                data: sdata,
                inverse: true,
                axisLabel: {
                    formatter: function (value, index) {
                        return `{p|} {a|${value}}`
                    },
                    rich: {
                        p: {
                            width: 10,
                            height: 10,
                            verticalAlign: 'middle',
                            lineHeight: 15,
                            backgroundColor: {
                                image: icon
                            }
                        },
                        a: {
                            fontSize: 18,
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
                data: xdata,
                axisTick: {show: false},
                axisLine: {show: false},
                splitLine: {show: false},
                axisLabel: {
                    fontSize: 8,
                    padding: [0, 0, 0, 1],
                    formatter: (v, index) => {
                        return `{value|${v}}`;
                    },
                    rich: {
                        value: {
                            color: '#fff',
                            fontSize: 9,
                            fontWeight: 500,
                        },
                    },
                },
            },
        ],
        series: [
            {
                data: sdata,
                type: 'bar',
                barWidth: 7,
                showBackground: true,
                backgroundStyle: {
                    color: '#152c58',
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
                                color: 'rgb(91, 137, 237)', // 0% 处的颜色
                            },
                            {
                                offset: 1,
                                color: '#698fda', // 0% 处的颜色
                            },
                        ],
                        global: false, // 缺省为 false
                    }
                },
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
            chartObj && chartObj.resize()
        }, 300)
    }
    if (useDataStoreHook().instanceTags && useDataStoreHook().instanceTags.length) {
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

.line {
    position: relative;
    padding-left: .8rem;
    margin-bottom: .05rem;

    &:before {
        position: absolute;
        left: 0;
        top: -.015rem;
        display: block;
        height: .03rem;
        width: .25rem;
        border-radius: .1rem;
        content: '';
        background: #79c1fa;
    }

    &:after {
        position: absolute;
        left: .4rem;
        top: -.015rem;
        display: block;
        height: .03rem;
        width: .25rem;
        border-radius: .1rem;
        content: '';
        background: #31557e;
        margin-right: .2rem;
    }

    span {
        display: block;
        height: .02rem;
        background: #132952;
    }
}

.stat-wrap {
    display: flex;
    align-items: flex-end;
    margin-bottom: .3rem;
    margin-left: -.2rem;

    .v-line {
        width: .02rem;
        height: .4rem;
        background: #27476f;
        margin: 0 .2rem .16rem .2rem;
    }
}

.chart {
    margin-bottom: -.3rem;
}
</style>
