<template>
    <div class="container" :style="{backgroundColor:props.bgColor}">
        <div class="flex">
            <div class="icon flex-center">
                <img src="@/assets/imgs/3/icon1.png" v-if="props.icon === '1'">
                <img src="@/assets/imgs/3/icon5.png" v-else-if="props.icon === '5'" style="width:108%">
                <img src="@/assets/imgs/3/icon8.png" v-else-if="props.icon === '8'" style="width:130%">
            </div>
            <div>
                <div class="title" :style="{margin: labelPos === 'top'?'0 0 .1rem .06rem':'.0rem 0 0 0'}">
                    <span>{{ props.label }}</span>
                    <img src="@/assets/imgs/3/icon3.png">
                </div>
                <NumberCnt :count-num="cntNum" :bg-style="{color:'transparent'}"
                           :number-style="{backgroundImage: 'linear-gradient(to bottom, #9ad4f7, #9dd7fc)',backgroundClip: 'text',color:'transparent','-webkit-background-clip':'text'}"
                           font-size=".4rem" :maxLen="10"/>
            </div>
        </div>
    </div>
</template>
<!--,backgroundClip: 'text',color:'transparent','-webkit-background-clip':'text'-->
<script setup lang="ts">
import NumberCnt from "@/views/visual3/components/Number.vue";

const props = defineProps({
    labelPos: {
        type: String,
        default: 'top'
    },
    label: {
        type: String,
        default: '课程总数'
    },
    bgColor: {
        type: String,
        default: '#0a143d'
    },
    icon: {
        type: String,
        default: '1'
    },
    cntNum: { // 数值
        type: [Number, String],
        default: 0
    },
})

</script>

<style scoped lang="scss">
.container {
    width: max-content;
    padding: .1rem .05rem .1rem .16rem;
    border-radius: .2rem;
    display: flex;

    > div {
        display: flex;
        align-items: center;
    }

    .icon {
        width: .4rem;
        height: .4rem;
        border-radius: .15rem;
        margin-right: .2rem;
        background: #09336f;
        padding: .15rem;
        box-sizing: content-box;

        > img {
            width: 100%;
        }
    }

    .title {
        font-size: .2rem;
        margin-left: 0 !important;
        display: flex;
        align-items: center;

        span {
            transform-origin: left;
        }

        img {
            margin-left: .1rem;
            width: .15rem;
        }
    }
}
</style>
