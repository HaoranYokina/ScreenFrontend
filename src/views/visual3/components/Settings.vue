<template>
    <div class="flex flex-center" style="align-items: stretch">
        <div class="com-box">
            <div class="flex com fullscreen" @click="fullScreen" title="F10">
                <img src="@/assets/imgs/2/full-screen-2.png" v-show="useCompSettingStoreHook().fullScreen"
                     class="expanded">
                <img src="@/assets/imgs/2/full-screen-1.png" v-show="!useCompSettingStoreHook().fullScreen">
            </div>
            <template v-if="useCompSettingStoreHook().hasPageTwo">
                <div class="flex com switch-com" @click="autoSwitchChange">
                    <span>自动切换视图</span>
                    <div :class="{on:useCompSettingStoreHook().autoSwitch}"></div>
                    <span>{{ useCompSettingStoreHook().autoSwitch ? '打开' : '关闭' }}</span>
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
                        <input v-model.number="useCompSettingStoreHook().switchStep" @input="onInput" type="number">
                    </div>
                    <span>分钟</span>
                </div>
            </template>
        </div>
        <div class="com switch" @click="switchPage()">
            <template v-if="useCompSettingStoreHook().hasPageTwo">
                <div :class="{checked:props.page===1}"></div>
                <div :class="{checked:props.page===2}"></div>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import {ref, watchEffect} from "vue";
import screenfull from "screenfull"
import {useCompSettingStoreHook} from "@/store/modules/compSetting";
import {useCompDataStoreHook} from "@/store/modules/compData";


const props = defineProps({
    page: {
        type: Number,
        default: 1
    }
})

const emit = defineEmits(['update:page', 'change', 'autoChange'])

const fullScreen = () => {
    useCompSettingStoreHook().fullScreen = !useCompSettingStoreHook().fullScreen
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
            useCompSettingStoreHook().fullScreen = !useCompSettingStoreHook().fullScreen
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
    }, useCompSettingStoreHook().switchStep * 1000 * 60)
}

watchEffect(() => {
    if (useCompSettingStoreHook().autoSwitch) {
        startSwitchTimer()
    } else {
        clearInterval(switchTimer)
    }
})

const onInput = (a) => {
    if (useCompSettingStoreHook().switchStep < 1) {
        useCompSettingStoreHook().switchStep = 1
    } else if (useCompSettingStoreHook().switchStep > 10000) {
        useCompSettingStoreHook().switchStep = 10000
    }
}


const pageIndex = ref(props.page)
const switchPage = (index) => {
    if (typeof index === "undefined") {
        index = 3 - pageIndex.value
    }
    pageIndex.value = index
    emit('update:page', index)
    emit('change', index)

    useCompDataStoreHook().loadData(pageIndex.value)
}

const autoSwitchChange = () => {
    useCompSettingStoreHook().autoSwitch = !useCompSettingStoreHook().autoSwitch
}

// 5分钟切换一次
setInterval(() => {
    useCompDataStoreHook().addRefreshCount()
    useCompDataStoreHook().loadData(pageIndex.value, true)
}, 300000)

useCompDataStoreHook().loadData(pageIndex.value)
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
    font-size: .22rem;
    color: #b6becd;
    margin-left: .1rem;
    display: flex;
    align-items: center;
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

</style>
