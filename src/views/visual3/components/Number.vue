<template>
    <div class="number-count-wrap" :class="numberSize">
        <!-- 标题 start -->
        <div class="number-title" :style="{'text-align': titleAlign}">
            {{ title }}
        </div>
        <!-- 标题 end -->
        <div class="number-count" :class="numberAlign">
            <!-- 计数器 start -->
            <ul class="number-content" ref="numberContent">
                <template v-for="(item,index) in charCount">
                    <li class="number-item" v-if="!isNaN(item)" :key="index">
												<span :style="bgStyle">
														<ul class="number-list" :style="{color,fontSize}">
															<li :style="{...numberStyle}">0</li>
															<li :style="{...numberStyle}">1</li>
															<li :style="{...numberStyle}">2</li>
															<li :style="{...numberStyle}">3</li>
															<li :style="{...numberStyle}">4</li>
															<li :style="{...numberStyle}">5</li>
															<li :style="{...numberStyle}">6</li>
															<li :style="{...numberStyle}">7</li>
															<li :style="{...numberStyle}">8</li>
															<li :style="{...numberStyle}">9</li>
														</ul>
												</span>
                    </li>
                    <li class="separator" :style="{...numberStyle}" v-else>
                        {{ item }}
                    </li>
                </template>
            </ul>
            <!-- 计数器 end -->
            <!-- 单位 start -->
            <div class="number-unit" v-if="unit">{{ unit }}</div>
            <!-- 单位 end -->
        </div>
    </div>
</template>

<script>
import {onMounted, reactive, ref, toRefs, watch} from 'vue'

export default {
    name: "numberCount",
    props: {
        numberSize: { // 字号大小 middle 中号 small 小号
            type: String,
            default: ''
        },
        title: { // 标题
            type: String,
            default: ""
        },
        titleAlign: { // 标题对齐方式
            type: String,
            default: ''
        },
        numberAlign: { //数字对齐方式
            type: String, // center 居中对齐
            default: ''
        },
        unit: { // 单位
            type: String,
            default: ""
        },
        countNum: { // 数值
            type: [Number, String],
        },
        initDelay: { // 首次加载延时
            type: Number,
        },
        maxLen: {
            type: Number,
            default: 8
        },
        bgStyle: {
            type: Object,
            default: {
                boxShadow: '0 0 10px rgba(65, 83, 116, 0.9) inset',
                background: 'rgba(23, 42, 81, .9)',
                borderRadius: '.05rem',
                width: '0.32rem',
                margin: '0 0.02rem'
            }
        },
        numberStyle: {
            type: Object,
            default: {}
        },
        fontSize: {
            type: String,
            default: '.38rem'
        },
        color: {
            type: String,
            default: 'rgba(212, 251, 245, 1)'
        }
    },
    setup(props) {
        const numberContent = ref(null)

        let localCountNum = props.countNum.toString().split('')
        const data = reactive({
            // 数字字符个数
            charCount: localCountNum,
        });
        watch(props, (newVal, oval) => {
            if (newVal) {
                let charArr = newVal.countNum.toString().split('')
                if (charArr.length > props.maxLen) {
                    charArr = charArr.slice(0, props.maxLen)
                    charArr.push('...')
                }

                data.charCount = charArr
                //console.log(nval.countNum.toLocaleString().split(''))
                toCharCount()
            }
        })
        onMounted(() => {
            setTimeout(() => {
                toCharCount(props.countNum) // 这里输入数字即可调用
            }, props.initDelay);
        })

        function setNumberTransform() {
            const doms = numberContent.value.querySelectorAll('.number-list')
            // 拿到数字的ref，计算元素数量
            const numberArr = data.charCount.filter(item => !isNaN(item))
            // 结合CSS 对数字字符进行滚动,显示订单数量
            for (let index = 0; index < doms.length; index++) {
                const elem = doms[index]
                elem.style.transform = `translate(0%, -${numberArr[index] * 10}%)`
            }
        }

        // 处理总订单数字
        function toCharCount() {
            setTimeout(() => {
                setNumberTransform()
            }, 100)
        }

        return {
            setNumberTransform,
            toCharCount,
            numberContent,
            ...toRefs(data)
        }
    }
};
</script>
<style scoped lang="scss">
.number-count-wrap {
    display: flex;
    align-items: center;

    .number-title {
        font-size: .22rem;
        color: #FFFFFF;
        line-height: 1;
    }

    .number-count {
        display: flex;
        justify-content: flex-start;
        align-items: flex-end;

        .number-content {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            /*文字禁止编辑*/
            -moz-user-select: none; /*火狐*/
            -webkit-user-select: none; /*webkit浏览器*/
            -ms-user-select: none; /*IE10*/
            -khtml-user-select: none; /*早期浏览器*/
            user-select: none;

            .number-item {
                display: flex;
                justify-content: center;
                align-items: center;

                & > span {
                    position: relative;
                    display: inline-block;
                    overflow: hidden;
                    height: 0.44rem;
                    box-sizing: border-box;
                    /*

                    height: 0.4rem;
                    background: linear-gradient(180deg, #2167D0 0%, #164D8F 100%);*/
                    /*box-shadow: 0 .04rem 0 0 #176ED6;
                    border: 1px solid white;
                    padding-bottom: .04rem;
                    */
                    box-sizing: border-box;

                    .number-list {
                        transition: transform 1s ease-in-out;
                        text-align: center;
                        font-weight: 600;

                        li {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            font-weight: 1200;
                            box-sizing: border-box;
                            height: 0.44rem;
                        }
                    }
                }
            }

            .separator {
                font-size: .3rem;
                line-height: 1;
                margin: 0 0.025rem;
                font-weight: 800;
            }
        }

        .number-unit {
            margin-left: .1rem;
            font-size: .18rem;
            font-weight: normal;
            color: #B1B7BC;
        }
    }

    .center {
        justify-content: center;
    }
}

// middle start
.middle {
    .number-title {
        font-size: .12rem;
    }

    .number-count {
        .number-content {
            .number-item {
                width: 0.2rem;
                margin: 0 0.0175rem;

                & > span {
                    height: 0.25rem;
                    box-shadow: 0 .025rem 0 0 #176ED6;
                    border-radius: .04rem;
                    padding-bottom: .025rem;

                    .number-list {
                        li {
                            height: 0.25rem;
                            font-size: .2rem;
                            font-weight: 400;
                            color: white;
                            box-sizing: border-box;
                        }
                    }
                }
            }

            .separator {
                font-size: .2rem;
                margin: 0 0.025rem;
            }
        }

        .number-unit {
            margin-left: .06rem;
            font-size: .12rem;
        }
    }
}

// middle end
</style>
