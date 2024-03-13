<template>
    <div class="content">
        <img src="@/assets/imgs/2/source-bg.png" alt="">
        <div class="cpu">
            <BLine line-color="#ffdb00"/>
            <h3>CPU消耗</h3>
            <span>{{ useDataStoreHook().sysResourceStat.cpuPercentage }}</span>
        </div>
        <div class="mem">
            <BLine line-color="#50e8ff"/>
            <h3>内存消耗</h3>
            <span>{{ useDataStoreHook().sysResourceStat.memoryPercentage }}</span>
        </div>
        <div class="disk">
            <BLine line-color="#4dfec2"/>
            <h3>磁盘消耗</h3>
            <span>{{ useDataStoreHook().sysResourceStat.diskPercentage }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import BLine from "@/views/visual2/components/BLine.vue";
import {useDataStoreHook} from "../../../../store/modules/data";
</script>

<style scoped lang="scss">

.content {
    width: 100%;
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
        width: 2.6rem;
        height: .7rem;
        position: absolute;
        background: rgba(255, 255, 255, 0.07);
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 .02rem 0 .05rem;

        h3 {
            width: 1rem;
            font-weight: normal;
            font-size: .25rem;
            /*background: url("@/assets/imgs/2/icon2.png") no-repeat .2rem .55rem / 80%;*/
            padding: .2rem;
            white-space: nowrap;
            transform: scale(.8);
        }

        span {
            flex: 1;
            margin-left: .23rem;
            display: block;
            font-size: .35rem;
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
    left: .12rem;
    top: 1.25rem;

    span {
        color: #ffdb00;
    }

    &:before {
        background: #ffdb00;
    }
}

.mem {
    right: .2rem;
    top: 1rem;

    span {
        color: #50e8ff;
    }

    &:before {
        background: #50e8ff;
    }
}

.disk {
    bottom: .83rem;
    left: 5rem;

    span {
        color: #4dfec2;
    }

    &:before {
        background: #4dfec2;
    }
}

</style>
