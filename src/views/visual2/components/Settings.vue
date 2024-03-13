<template>
    <div class="flex flex-center" style="align-items: stretch">
        <div class="com-box">
            <div class="com back">
                <img src="@/assets/imgs/2/back.png">
                <a @click="back">返回靶场</a>
            </div>
            <div class="flex com fullscreen" @click="fullScreen" title="F10">
                <img src="@/assets/imgs/2/full-screen-2.png" v-show="useSettingStoreHook().fullScreen" class="expanded">
                <img src="@/assets/imgs/2/full-screen-1.png" v-show="!useSettingStoreHook().fullScreen">
            </div>
            <div class="flex com switch-com" @click="autoSwitchChange">
                <span>自动切换视图</span>
                <div :class="{on:useSettingStoreHook().autoSwitch}"></div>
                <span>{{ useSettingStoreHook().autoSwitch ? '打开' : '关闭' }}</span>
            </div>
            <div class="v-line"></div>
            <!--
              <div class="flex com timer-com">
                    <span>数据刷新频率</span>
                    <div>
                        <input value="1">
                    </div>
                    <span>分钟</span>
                </div>

                <div class="v-line"></div>
            -->
            <div class="flex com timer-com">
                <span>视图切换频率</span>
                <div>
                    <input v-model.number="useSettingStoreHook().switchStep" @input="onInput" type="number">
                </div>
                <span>分钟</span>
            </div>
        </div>
        <div class="com switch" @click="switchPage()">
            <div :class="{checked:props.page===1}"></div>
            <div :class="{checked:props.page===2}"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import screenfull from "screenfull"
import {useSettingStoreHook} from "@/store/modules/setting";
import {useDataStoreHook} from "@/store/modules/data";

let img2 = utils.requireImg('@/assets/imgs/2/bg2.jpg')
let img1 = utils.requireImg('@/assets/imgs/2/bg1-1.jpg')

const props = defineProps({
    page: {
        type: Number,
        default: 1
    }
})

const emit = defineEmits(['update:page', 'change', 'autoChange'])

const fullScreen = () => {
    useSettingStoreHook().fullScreen = !useSettingStoreHook().fullScreen
    screenfull.toggle()
    setTimeout(() => {
        if (screenfull.isFullscreen) {
            //location.reload()
        }
    }, 0)
}

if (screenfull.isEnabled) {
    document.addEventListener('keydown', function (e) {
        if (e.key === 'F10') {
            useSettingStoreHook().fullScreen = !useSettingStoreHook().fullScreen
            screenfull.toggle()
            setTimeout(() => {
                if (screenfull.isFullscreen) {
                    //location.reload()
                }
            }, 0)
            e.preventDefault()
        }
    })
}

let switchTimer
const startSwitchTimer = () => {
    clearInterval(switchTimer)
    switchTimer = setInterval(() => {
        switchPage(3 - pageIndex.value)
    }, useSettingStoreHook().switchStep * 1000 * 60)
}

const onInput = (a) => {
    if (useSettingStoreHook().switchStep < 1) {
        useSettingStoreHook().switchStep = 1
    } else if (useSettingStoreHook().switchStep > 10000) {
        useSettingStoreHook().switchStep = 10000
    }
}


if (useSettingStoreHook().autoSwitch) {
    startSwitchTimer()
}

const pageIndex = ref(props.page)
const switchPage = (index) => {
    if (typeof index === "undefined") {
        index = 3 - pageIndex.value
    }
    pageIndex.value = index
    emit('update:page', index)
    emit('change', index)

    useDataStoreHook().loadData(pageIndex.value)
    //document.body.style.backgroundImage = `url("${index.ts === 1 ? img1 : img2}")`
}

const autoSwitchChange = () => {
    useSettingStoreHook().autoSwitch = !useSettingStoreHook().autoSwitch
    if (useSettingStoreHook().autoSwitch) {
        startSwitchTimer()
    } else {
        clearInterval(switchTimer)
    }
}

setInterval(() => {
    useDataStoreHook().loadData(pageIndex.value, true)
}, 60000)

useDataStoreHook().loadData(pageIndex.value)

const back = () => {
    history.back()
}
</script>

<style scoped lang="scss">

.com-box {
    display: flex;
    align-items: stretch;
    opacity: .26;
    transition: opacity .3s ease-in-out;

    &:hover {
        opacity: 1;
    }
}

.fullscreen {
    img {
        width: .2rem;
        height: .2rem;
        cursor: zoom-in;

        &.expanded {
            cursor: zoom-out;
        }
    }
}

.com {
    font-size: .2rem;
    color: #b6becd;
    margin-left: .1rem;
    display: flex;
    align-items: center;

    span {
        transform: scale(.9);
    }
}

.v-line {
    width: .02rem;
    background: red;
    margin: .1rem 0 .1rem .2rem;
    border-radius: .1rem;
    background: linear-gradient(to bottom, #00eaff, #178dff);
}

.timer-com {
    > div {
        background: linear-gradient(to right bottom, #00eaff, #178dff);
        padding: .02rem;
        border-radius: .2rem;
        width: .9rem;
        box-sizing: border-box;
        margin: 0 .1rem;

        input {
            font-size: .2rem;
            text-align: center;
            width: 100%;
            border: none;
            box-sizing: border-box;
            border-radius: .2rem;
            padding: .03rem .2rem;
            color: #b6becd;
            border: 0;
            background: #2e3449;
            -moz-appearance: textfield; /* Firefox */

            &::-webkit-inner-spin-button,
            &::-webkit-outer-spin-button {
                -webkit-appearance: none;
                margin: 0;
            }
        }
    }
}

.switch-com {
    cursor: pointer;

    > div {
        border-radius: .5rem;
        width: .8rem;
        height: .36rem;
        box-sizing: border-box;
        margin: 0 .1rem;
        position: relative;
        transition: all .2s ease-in-out;
        background: linear-gradient(to right, #113150, #09467e);

        &:after {
            content: '';
            display: block;
            width: .3rem;
            height: .3rem;
            background: #ffffff;
            border-radius: 100%;
            margin: .03rem 0 .03rem .05rem;
            transition: margin .2s ease-in-out;
        }


        &.on {
            background: linear-gradient(to right, #70fdfc, #178dff);

            &:after {
                content: '';
                display: block;
                width: .3rem;
                height: .3rem;
                background: #ffffff;
                border-radius: 100%;
                margin: .03rem 0 .03rem .45rem;
            }
        }

    }
}

.switch {
    margin-left: .2rem;
    margin-right: .45rem;
    display: flex;
    align-items: center;

    div {
        width: .2rem;
        height: .2rem;
        background: #25578f;
        border-radius: 100%;
        cursor: pointer;
        transition: width .2s;

        &:last-of-type {
        }

        &.checked {
            width: .68rem;
            height: .33rem;
            background: url("@/assets/imgs/2/switch-btn.png") no-repeat center / contain;
            margin: 0 .05rem;
        }
    }
}


.back {
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-right: .1rem;
    img{
        width: .2rem;
        margin-right: .05rem;
    }
}
</style>
