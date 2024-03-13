<template>
    <div class="container" :style="{backgroundColor:props.bgColor}">
        <div>
            <div class="title" v-html="props.label"
                 :style="{margin: labelPos === 'top'?'0 0 .1rem .06rem':'.0rem 0 0 0'}"/>
            <div class="flex">
                <NumberCnt :count-num="cntNum" :bg-style="{color:'transparent'}"
                           :number-style="{color:'#ffffff'}"
                           font-size=".36rem" :maxLen="10"/>

                <div v-if="props.unit" class="unit">{{ props.unit }}</div>
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
        default: '#08143d'
    },
    unit: {
        type: String,
        default: ''
    },
    cntNum: { // 数值
        type: Number,
        default: 0
    }
})

</script>

<style scoped lang="scss">
.container {
    width: max-content;
    padding: .15rem;
    border-radius: .2rem;
    display: flex;

    .unit {
        font-size: .2rem;
        transform: scale(.8);
        align-self: flex-end;
        margin-bottom: .05rem;
    }

    > div {
        display: flex;
        flex-direction: column;
    }

    .title {
        font-size: .2rem;
        transform: scale(.7);
        transform-origin: left;
        margin-bottom: 0 !important;

        & + * {
            margin-bottom: -.05rem;
        }
    }
}
</style>
