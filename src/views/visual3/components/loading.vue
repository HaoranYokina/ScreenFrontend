<template>
    <div class="m-spin-dot">
        <span class="u-dot-item"></span>
        <span class="u-dot-item"></span>
        <span class="u-dot-item"></span>
        <span class="u-dot-item"></span>
    </div>
</template>
<script>
export default {
    name: 'Loading'
}
</script>
<style lang="scss" scoped>
.m-spin-dot {
    // 水平垂直居中
    position: relative;
    width: .3rem;
    height: .3rem;
    transform: rotate(45deg);
    animation: rotate 1.2s linear infinite;
    @keyframes rotate {
        100% {
            transform: rotate(405deg);
        }
    }

    .u-dot-item {
        // 单个圆点样式
        position: absolute;
        width: .1rem;
        height: .1rem;
        background: #f3a142;
        border-radius: 100%;
        opacity: .3;
        animation: spinMove 1s linear infinite alternate;
        -webkit-animation: spinMove 1s linear infinite alternate;
        @keyframes spinMove {
            100% {
                opacity: 1;
            }
        }
    }

    .u-dot-item:first-child {
        top: 0;
        left: 0;
    }

    .u-dot-item:nth-child(2) {
        top: 0;
        right: 0;
        animation-delay: .4s;
        -webkit-animation-delay: .4s;
    }

    .u-dot-item:nth-child(3) {
        bottom: 0;
        right: 0;
        animation-delay: .8s;
        -webkit-animation-delay: .8s;
    }

    .u-dot-item:last-child {
        bottom: 0;
        left: 0;
        animation-delay: 1.2s;
        -webkit-animation-delay: 1.2s;
    }
}
</style>