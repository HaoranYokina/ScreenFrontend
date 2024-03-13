<template>
    <div class="content">
        <img src="@/assets/imgs/3/source-bg.png" alt="">
        <div class="cpu">
            <BLine line-color="#ffdb00"/>
            <h3>CPU消耗</h3>
            <span>{{ props.cpu }}%</span>
        </div>
        <div class="mem">
            <BLine line-color="#50e8ff"/>
            <h3>内存消耗</h3>
            <span>{{ props.mem }}%</span>
        </div>
        <div class="disk">
            <BLine2 line-color="#4dfec2"/>
            <h3>带宽消耗</h3>
            <span>{{ props.network }}Kbps</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import BLine from "@/views/visual2/components/BLine.vue";
import BLine2 from "@/views/visual2/components/BLine2.vue";

const props = defineProps({
    cpu: {
        type: Number,
        default: 0
    },
    mem: {
        type: Number,
        default: 0
    },
    network: {
        type: Number,
        default: 0
    }
})
</script>

<style scoped lang="scss">

.content {
    width: 90%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    img {
        width: 100%;
        user-select: none;
        pointer-events: none;
    }

    > div {
        width: 2.2rem;
        height: .6rem;
        position: absolute;
        background: rgba(255, 255, 255, 0.07);
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 .02rem 0 .05rem;

        h3 {
            width: 1rem;
            font-weight: normal;
            font-size: .225rem;
            /*background: url("@/assets/imgs/2/icon2.png") no-repeat .2rem .55rem / 80%;*/
            padding: .2rem .08rem;
            white-space: nowrap;
        }

        span {
            flex: 1;
            margin-left: .08rem;
            display: block;
            font-size: .28rem;
            font-weight: 800;
            text-align: center;
        }

        > svg {
            position: absolute;
            bottom: -1px;
            right: -1px;
        }

        &:before {
            position: absolute;
            content: '';
            width: .05rem;
            height: .05rem;
            left: -.01rem;
            top: -.01rem;
        }
    }
}

.cpu {
    left: -.38rem;
    top: .7rem;

    span {
        color: #ffdb00;
    }

    &:before {
        background: #ffdb00;
    }
}

.mem {
    right: -.5rem;
    top: .5rem;

    span {
        color: #50e8ff;
    }

    &:before {
        background: #50e8ff;
    }
}

.disk {
    width: 3rem !important;
    bottom: .3rem;
    left: 3.5rem;

    h3 {
    }

    span {
        color: #4dfec2;
        font-size: .25rem !important;
    }

    &:before {
        background: #4dfec2;
    }
}

</style>
