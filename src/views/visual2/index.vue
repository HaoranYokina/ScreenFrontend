<template>
    <div class="stage">
        <header>
            <div class="logo">
                <img src="@/assets/imgs/2/logo3.png">
                <span>清华侦攻防溯数据大屏</span>
            </div>
            <div>
                <Settings v-model:page="useSettingStoreHook().pageIndex"/>
            </div>
        </header>
        <div class="page-wrap">
            <transition name="left">
                <section class="main flex main-page" v-show="useSettingStoreHook().pageIndex === 1" key="manPage">
                    <div class="box flex-col" style="padding-bottom:.2rem">
                        <h3 class="title1">课程任务人员得分情况</h3>
                        <GridList1 class="flex-1"/>
                    </div>
                    <div class="box">
                        <div class="h-100 flex-col">
                            <h3 class="title1">课程统计</h3>
                            <StatNumber style="margin-top: .2rem" label="课程总数"
                                        :cnt-num="useDataStoreHook().courseTotal"/>
                            <div class="flex-col flex-1">
                                <Brokenline4 class="flex-1" color="#43aaf2" style="margin-top: .3rem;"
                                             title="老师平均开设课程数折线图"
                                             :data-list="useDataStoreHook().courseAvgList"/>
                                <Brokenline4 class="flex-1" color="#4cf0fe" style="margin-top: .3rem;"
                                             title="课程总未截止任务数折线图"
                                             :data-list="useDataStoreHook().courseUnfinishedList"/>
                                <Brokenline4 class="flex-1" color="#72cb64" style="margin-top: .3rem;"
                                             title="课程平均学生人数折线图"
                                             :data-list="useDataStoreHook().courseAvgStudentList"/>
                            </div>
                        </div>
                    </div>
                    <div class="flex-col">
                        <div class="box flex-1 flex-col">
                            <div class="flex flex-sb" style="align-items: flex-start;">
                                <h3 class="title1">任务统计</h3>
                                <StatNumber label-pos="left" :label="'任务<br>总数'"
                                            :cnt-num="useDataStoreHook().taskTotal"/>
                            </div>
                            <Barchart1 class="flex-1" :dataList="useDataStoreHook().taskTagList"/>
                        </div>
                        <div class="box flex-1 flex-col">
                            <div class="flex flex-sb" style="align-items: flex-start;">
                                <h3 class="title1">场景统计</h3>
                                <StatNumber label-pos="left" :label="'场景<br>总数'"
                                            :cnt-num="useDataStoreHook().sceneTotal"/>
                            </div>
                            <Barchart2 class="flex-1" key="bc2" :data-list="useDataStoreHook().sceneList"/>
                        </div>
                    </div>
                </section>
            </transition>
            <transition name="right">
                <section class="main flex sub-page" v-show="useSettingStoreHook().pageIndex === 2" key="subPage">
                    <div class="flex-col">
                        <div class="box flex-1" style="">
                            <Brokenline4 class="flex-1" color="#70a2ef" title="运行容器总数与折线图"
                                         :data-list="useDataStoreHook().containers"/>
                        </div>
                        <div class="box flex-1" style="margin-top: .5rem">
                            <Brokenline4 class="flex-1" color="#de9eba" title="运行虚拟机总数与折线图"
                                         :data-list="useDataStoreHook().vms"/>
                        </div>
                        <div class="box flex-1" style="margin-top: .5rem">
                            <Brokenline4 class="flex-1" color="#e09583" title="运行交换机总数与折线图"
                                         :data-list="useDataStoreHook().exchanges"/>
                        </div>
                    </div>
                    <div class="flex-col">
                        <div class="stat-wrap">
                            <StatNumber label="在线总人数" bg-color="#0e1e40"
                                        :cnt-num="useDataStoreHook().userStat.total"/>
                            <StatNumber2 label="学生人数" bg-color="#0e1e40"
                                         :cnt-num="useDataStoreHook().userStat.totalStudent"/>
                            <StatNumber2 label="教师人数" bg-color="#0e1e40"
                                         :cnt-num="useDataStoreHook().userStat.totalTeacher"/>
                            <StatNumber2 label="科研人员人数" bg-color="#0e1e40"
                                         :cnt-num="useDataStoreHook().userStat.totalResearcher"/>
                        </div>
                        <div class="sys-source-wrap flex-col">
                            <h3 class="title1">系统整体资源开销监控</h3>
                            <SourceChart class="flex-1"/>
                        </div>
                        <div class="flex-col" style="flex:2.5;margin-top:.5rem">
                            <h3 class="title1">单个学员所开启的资源消耗的实例排行</h3>
                            <SortChart class="flex-1"/>
                        </div>
                    </div>
                    <div class="flex-col">
                        <div class="flex-1 flex-col">
                            <h3 class="title1">单个实例资源消耗监控</h3>
                            <RingChart1 class="flex-1"/>
                        </div>
                        <div class="flex-col" style="margin-top: 1rem;flex: 1.66">
                            <h3 class="title1">运行实例统计</h3>
                            <Barchart3 class="flex-1" style="margin-top: .5rem"/>
                        </div>
                    </div>
                </section>
            </transition>
        </div>
    </div>
</template>

<script setup lang="ts">
import Settings from "@/views/visual2/components/Settings.vue";
import StatNumber from "@/views/visual2/components/chart/StatNumber.vue";
import StatNumber2 from "@/views/visual2/components/chart/StatNumber2.vue";
import Brokenline4 from "@/views/visual2/components/chart/Brokenline4.vue";
import Barchart1 from "@/views/visual2/components/chart/Barchart1.vue";
import Barchart2 from "@/views/visual2/components/chart/Barchart2.vue";
import Barchart3 from "@/views/visual2/components/chart/Barchart3.vue";
import GridList1 from "@/views/visual2/components/chart/GridList1.vue";
import SortChart from "@/views/visual2/components/chart/SortChart.vue";
import SourceChart from "@/views/visual2/components/chart/SourceChart.vue";
import RingChart1 from "@/views/visual2/components/chart/RingChart1.vue";
import {onMounted} from "vue";
import {useSettingStoreHook} from "@/store/modules/setting";
import {useDataStoreHook} from "@/store/modules/data";

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
})

const back = () => {
    alert(1)
    history.back()
}
</script>
<style>
html {
    min-width: 1280px;
    min-height: 720px;
}

body {
    background-image: url('@/assets/imgs/2/bg1-1.jpg');
    background-color: #040f20;
    background-repeat: no-repeat;
    background-size: cover;
    overflow: hidden;
}

.el-select-dropdown {
    min-width: initial !important;
}

.el-select-dropdown__empty {
    min-width: 160px !important;
}

.el-select__popper {
    padding: 10px !important;
    border: 0 !important;
}

@keyframes fold-left-out {
    0% {
        opacity: 1;
    }
    100% {
        transform: translate(-100%, 0);
        opacity: 0;
    }
}

@keyframes fold-right-in {
    0% {
        opacity: 0;
        transform: translate(0, 0);
    }
    100% {
        opacity: 1;
        transform: translate(-100%, 0);
    }
}

@keyframes fold-right-out {
    0% {
        transform: translate(-100%, 0);
        opacity: 1;
    }
    100% {
        transform: translate(0, 0);
        opacity: 0;
    }
}

@keyframes fold-left-in {
    0% {
        transform: translate(-100%, 0);
        opacity: 0;
    }
    100% {
        transform: translate(0, 0);
        opacity: 1;
    }
}

.left-leave-active {
    animation: fold-left-out .5s ease-in-out;
}

.right-enter-active {
    animation: fold-right-in .5s ease-in-out;
}

.left-enter-active {
    animation: fold-left-in .5s ease-in-out;
}

.right-leave-active {
    animation: fold-right-out .5s ease-in-out;
}

</style>
<style scoped lang="scss">

.stage {
    color: #ffffff;
    font-size: .25rem;
    height: 100%;
}

header {
    height: 1.2rem;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .logo {
        position: relative;
        z-index: 9;
        display: flex;
        align-items: center;
        padding-left: .3rem;
        user-select: none;

        img {
            width: .9rem;
            pointer-events: none;
        }

        span {
            font-weight: bold;
            margin-left: .06rem;
            font-size: .35rem;
            letter-spacing: .005rem;
            pointer-events: none;
        }

        a {
            font-size: .18rem;
            margin-left: .2rem;
        }
    }


}

.main {
    position: relative;
    z-index: 9;
    padding: .1rem;
    box-sizing: border-box;
    align-items: stretch;
}


.page-wrap {
    min-height: calc(100% - 1.1rem);
    height: max-content;
    display: flex;

    section {
        width: 100%;
        flex-shrink: 0;
    }
}

.main-page {
    justify-content: space-around;
    padding: .06rem .35rem .8rem .35rem;

    > div {
        margin: 0 .35rem;

        &:nth-of-type(1) {
            flex: 438;
        }

        &:nth-of-type(2) {
            flex: 426;
        }

        &:nth-of-type(3) {
            flex: 570;

            > div:nth-of-type(1) {
                margin-bottom: .7rem;
            }
        }
    }
}

.sub-page {
    justify-content: space-around;
    padding: .06rem .45rem .8rem .35rem;
    position: relative;

    &:before {
        position: absolute;
        inset: 0;
        content: '';
        background: url("@/assets/imgs/2/bg-grid.png") center / 90% no-repeat;
        z-index: -1;
        opacity: .2;

    }

    > div {
        margin: 0 .35rem;

        &:nth-of-type(1) {
            flex: 376;
        }

        &:nth-of-type(2) {
            flex: 668;
        }

        &:nth-of-type(3) {
            flex: 373;
        }
    }

    .stat-wrap {
        flex: 1;
        display: flex;
        justify-content: space-between;
        margin-bottom: .4rem;

        > div {
            flex: 1;
            margin-right: .5rem;

            &:last-of-type {
                margin-right: 0;
            }
        }
    }

    .sys-source-wrap {
        /*background: url("@/assets/imgs/2/source-bg.png") no-repeat center / contain;*/
        flex: 5;
        position: relative;
    }
}

.box {
    position: relative;
    padding: .4rem .3rem .3rem .3rem;

    &:before {
        position: absolute;
        z-index: -1;
        content: '';
        inset: 0;
        background: rgba(82, 116, 205, 0.06);
        border-radius: .2rem;
    }
}

.title {
    padding: .08rem 0;
    font-weight: normal;
    font-size: .2rem;
}

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

.title2 {
    position: relative;
    padding-left: .25rem;
    font-size: .2rem;
    font-weight: 400;

    &:before {
        position: absolute;
        content: '';
        left: 0;
        top: 50%;
        width: .06rem;
        height: .15rem;
        background: rgba(12, 60, 130, 1);
        transform: translateY(-50%);
    }
}
</style>
