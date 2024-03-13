<template>
    <div class="stage">
        <header>
            <div class="logo">
                <img src="@/assets/imgs/1/logo.png">
                <span>清华星阵数据大屏</span>
            </div>
            <div class="bg">
            </div>
        </header>
        <!--	横向5等份		-->
        <section class="main flex">
            <div class="left flex-col flex-1">
                <div class="box flex-1 bg3">
                    <h3 class="title1">在线人数</h3>
                    <Brokenline3/>
                </div>
                <div class="box flex-1-3 bg1 flex-col">
                    <h3 class="title1">运行实例统计</h3>
                    <Barchart2 class="flex-1" style="margin-top: .45rem"></Barchart2>
                </div>
            </div>
            <div class="right flex-col flex-4">
                <div class="top flex-1-2  flex">
                    <div class="box flex-1 flex-col">
                        <h3 class="title" style="margin-top: -.15rem">虚拟运行设备统计</h3>
                        <Brokenline1 class="flex-1" style="margin-top: .2rem"/>
                        <Brokenline1 class="flex-1" style="margin-top: .5rem" :icon="'@/assets/imgs/1/icon2.png'"
                                     color="#6e85de"
                                     :title-icon="utils.requireImg('@/assets/imgs/1/b.png')"/>
                        <Brokenline1 class="flex-1" style="margin-top: .5rem" :icon="'@/assets/imgs/1/icon3.png'"
                                     color="#fb7db8"
                                     :title-icon="utils.requireImg('@/assets/imgs/1/c.png')"/>
                    </div>
                    <div class="box flex-1 bg1 flex-col">
                        <h3 class="title1">任务统计</h3>
                        <Barchart1 class="flex-1" style="margin-top: .45rem"/>
                    </div>
                    <div class="flex-2 box flex bg1">
                        <div class="flex-1 flex-col">
                            <div class="title">课程统计</div>
                            <Brokenline4 class="flex-1" style="margin-top: .2rem"/>
                        </div>
                        <div class="flex-1 ml-2">
                            <Chart1 class="h-100"/>
                        </div>
                    </div>
                </div>
                <div class="bottom flex-1  flex">
                    <div class="box flex-3-3 flex bg2">
                        <div class="flex-1">
                            <div class="title">非名榜单</div>
                        </div>
                        <div class="flex-2 flex-col">
                            <div class="title">FLAG提交日志表</div>
                            <div class="bg5">
                            </div>
                        </div>
                    </div>
                    <div class="box flex-1 flex-col">
                        <div class="title">任务完成情况</div>
                        <div class="flex-col flex-1 ">
                            <div class="line1 flex-1 h-100" style="margin-top: .3rem">
                                <Brokenline2/>
                            </div>
                            <div class="line1 flex-1 h-100" style="margin-top: .5rem">
                                <Brokenline2 color="#7883d4"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import screenfull from "screenfull"
import {onMounted} from "vue";
import Chart1 from "@/views/visual/components/chart/Chart1.vue";
import Barchart1 from "@/views/visual/components/chart/Barchart1.vue";
import Barchart2 from "@/views/visual/components/chart/Barchart2.vue";
import Brokenline1 from "@/views/visual/components/chart/Brokenline1.vue";
import Brokenline2 from "@/views/visual/components/chart/Brokenline2.vue";
import Brokenline3 from "@/views/visual/components/chart/Brokenline3.vue";
import Brokenline4 from "@/views/visual/components/chart/Brokenline4.vue";

onMounted(() => {
    //document.documentElement.style.fontSize = utils.countHtmlFontSize(2667)
    function setRem() {
        /*let screenWidth = document.body.clientWidth;
        let fontSize = screenWidth / 24; // 根据需要设置基准值，这里将屏幕宽度分成10份
        document.documentElement.style.fontSize = fontSize + 'px';
        */
        let designWidth = 2667; // 设计图的宽度
        let screenWidth = document.body.clientWidth;
        let fontSize = screenWidth * 100 / designWidth; // 计算fontSize的值，屏幕宽度乘以100后除以设计图的宽度
        document.documentElement.style.fontSize = fontSize + 'px';
    }

    // 在窗口大小改变时重新计算rem
    window.addEventListener('resize', setRem);
    // 初始化时调用一次
    setRem();
    if (screenfull.isEnabled) {
        document.addEventListener('keydown', function (e) {
            if (e.key === 'F10') {
                screenfull.toggle()
                e.preventDefault()
            }
        })
    }
})
</script>
<style>
html {
    min-width: 1280px;
    min-height: 720px;
}

body {
    background: url('@/assets/imgs/1/bg.jpg') #040f20 no-repeat;
    background-size: cover;
    overflow: hidden;
}
</style>
<style scoped lang="scss">
.stage {
    /*background: url('@/assets/imgs/1/bg.jpg') #040f20 no-repeat;
    background-size: cover;*/
    color: #ffffff;
    font-size: .25rem;
    height: 100%;
}

header {
    height: 1.1rem;
    position: relative;


    .logo {
        position: relative;
        z-index: 9;
        padding-top: .39rem;
        display: flex;
        align-items: center;
        padding-left: .3rem;

        img {
            width: 1.77rem;
        }

        span {
            font-weight: bold;
            margin-left: .3rem;
            font-size: .35rem;
            letter-spacing: .005rem;
        }
    }

    /*明亮的背景效果*/
    .bg {
        position: absolute;
        left: 2rem;
        top: -2.6rem;
        width: 9rem;
        height: 9rem;
        background: radial-gradient(circle, rgba(7, 29, 84, .9), rgba(4, 15, 32, 0.1) 75%, rgba(4, 15, 32, 0.02)) 100%;
    }
}

.main {
    min-height: calc(100% - 1.1rem);
    height: max-content;
    position: relative;
    z-index: 9;
    padding: .1rem;
    box-sizing: border-box;
    align-items: stretch;
}

.box {
    padding: .1rem .18rem;
    box-sizing: border-box;
    margin: .1rem;

    .box-inner {
        border-radius: .2rem;
        width: 100%;
        height: 100%;
        padding: .1rem .2rem;
    }
}

.title {
    padding: .08rem 0;
    font-weight: normal;
    font-size: .2rem;
}


.title1 {
    @extend .title;
    border-bottom: .02rem solid #2a90ad;
    padding: .12rem .18rem;
    font-weight: normal;
    font-size: .2rem;
    background: linear-gradient(to bottom, rgba(42, 144, 173, 0) 0%, rgba(42, 144, 173, 0.05) 50%, rgba(42, 144, 173, 0.2) 100%);
}

.right {
    .bottom {
    }
}

.bg1 {
    background: rgba(107, 120, 212, 0.13);
    border-radius: .2rem;
}

.bg2 {
    border-radius: .2rem;
    background: linear-gradient(-35deg, rgba(107, 120, 212, 0.22), rgba(35, 112, 241, 0.22) 60%, rgba(35, 112, 241, 0.22));

}

.bg3 {
    border-radius: .2rem;
    background: linear-gradient(45deg, rgba(17, 24, 40, 0.8), rgba(36, 55, 119, 0.7));
}

.bg4 {
    border-radius: .2rem;
    background: rgba(17, 24, 40, 0.8);
}

.bg5 {
    padding: .1rem;
    height: 100%;
    border-radius: .2rem;
    box-shadow: 0 0 .1rem .06rem rgba(36, 55, 119, 1) inset;
}
</style>
