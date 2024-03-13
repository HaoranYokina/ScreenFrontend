<template>
    <div class="container" :style="{backgroundColor:props.bgColor}">
        <div class="flex">
            <div class="icon flex-center">
                <img src="@/assets/imgs/2/icon4.png">
            </div>
            <div>
                <div class="title" v-html="props.label"
                     :style="{margin: labelPos === 'top'?'0 0 .1rem .06rem':'.0rem 0 0 0'}"/>
                <NumberCnt :count-num="cntNum" :bg-style="{color:'transparent'}"
                           :number-style="{backgroundImage: 'linear-gradient(to bottom, #9ad4f7, #9dd7fc)',backgroundClip: 'text',color:'transparent','-webkit-background-clip':'text'}"
                           font-size=".38rem" :maxLen="10"/>
            </div>
        </div>
    </div>
</template>
<!--,backgroundClip: 'text',color:'transparent','-webkit-background-clip':'text'-->
<script setup lang="ts">
import NumberCnt from "@/views/visual2/components/Number.vue";

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
    cntNum: { // 数值
        type: Number,
        default: 0
    },
})

</script>

<style scoped lang="scss">
.container {
    width: max-content;
    padding: .1rem .05rem .1rem .16rem;
    box-shadow: 0 0 .05rem #081533;
    border-radius: .2rem;
    display: flex;

    > div {
        display: flex;
        align-items: center;
    }

    .icon {
        width: .7rem;
        height: .8rem;
        background: #081234;
        border-radius: .15rem;
        margin-right: .06rem;

        > img {
            width: 100%;
        }
    }

    .title {
        font-size: .2rem;
        transform: scale(.7);
        transform-origin: left;
    }
}
</style>
