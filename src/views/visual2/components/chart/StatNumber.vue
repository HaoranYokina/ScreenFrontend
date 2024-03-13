<template>
    <div class="container" :style="{backgroundColor:props.bgColor,boxShadow:props.boxShadow}">
        <div :style="{flexDirection: labelPos === 'top'?'column':'row'}">
            <div class="title" v-html="props.label"
                 :style="{margin: labelPos === 'top'?'0 0 .1rem .06rem':'.0rem 0 0 0'}"/>
            <NumberCnt :count-num="cntNum" :bg-style="{color:'transparent'}"
                       :number-style="{backgroundImage: 'linear-gradient(to bottom, #9df782, #5ec54f)',backgroundClip: 'text',color:'transparent','-webkit-background-clip':'text'}"
                       font-size=".56rem" :maxLen="10"/>
        </div>
        <div v-if="props.unit" class="unit">{{ props.unit }}</div>
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
        default: '#08143d'
    },
    unit: {
        type: String,
        default: ''
    },
    boxShadow: {
        type: String,
        default: '0 0 .05rem #081533'
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
    padding: .15rem .25rem .15rem .25rem;
    border-radius: .2rem;
    display: flex;

    .unit {
        font-size: .2rem;
        transform: scale(.8);
        align-self: flex-end;
    }

    > div {
        display: flex;
    }

    .title {
        font-size: .2rem;
        transform: scale(.7);
        transform-origin: left;
        margin-bottom: .2rem;
        line-height: 1.5;
    }
}
</style>
