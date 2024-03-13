<template>
    <div>
        <h3 class="title1 flex-sb" style="margin-bottom: .4rem">
            <span>各个漏洞的攻击防守提交情况</span>
            <div class="flex com switch-com">
                <span>自动切换漏洞</span>
                <div :class="{on:auto}" @click="auto = !auto"></div>
            </div>
        </h3>
        <div class="tip-box">
            <div>
                <label>当前展示:</label>
                <span>XX漏洞</span>
            </div>
            <div>
                <label>xx秒后展示为:</label>
                <span>XX漏洞</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {ref} from "vue";

const auto = ref(false)
</script>
<style scoped lang="scss">
.title1 {
    position: relative;
    padding-left: .49rem;
    font-size: .26rem;
    font-weight: 400;
    letter-spacing: .01rem;

    &:before {
        position: absolute;
        content: '';
        left: 0;
        top: 50%;
        width: .26rem;
        height: .26rem;
        background: rgba(12, 60, 130, 1);
        border-radius: 100%;
        transform: translateY(-50%);
    }

    &:after {
        position: absolute;
        top: 50%;
        left: .08rem;
        transform: translateY(-50%);
        content: '';
        width: .1rem;
        height: .1rem;
        background: rgba(143, 225, 254, 1);
        border-radius: 100%;
    }
}

.com {
    font-size: .22rem;
    color: #b6becd;
    margin-left: .1rem;
    display: flex;
    align-items: center;
}

.switch-com {
    cursor: pointer;

    > div {
        border-radius: .5rem;
        width: .6rem;
        height: .26rem;
        box-sizing: border-box;
        margin: 0 .1rem;
        position: relative;
        transition: all .2s ease-in-out;
        background: linear-gradient(to right, #113150, #09467e);

        &:after {
            content: '';
            display: block;
            width: .2rem;
            height: .2rem;
            background: #ffffff;
            border-radius: 100%;
            margin: .02rem 0 .03rem .05rem;
            transition: margin .2s ease-in-out;
        }


        &.on {
            background: linear-gradient(to right, #70fdfc, #178dff);

            &:after {
                content: '';
                display: block;
                width: .2rem;
                height: .2rem;
                background: #ffffff;
                border-radius: 100%;
                margin: .02rem 0 .03rem .35rem;
            }
        }
    }
}


.tip-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: .3rem;
    padding: 0 .1rem;

    label {
        font-size: .2rem;
        color: rgba(248, 248, 248, 0.6);
    }

    span {
        font-size: .23rem;
        color: rgb(233, 196, 39);
        font-style: italic;
    }
}

</style>
