<template>
    <div class="stage">
        <header>
            <div class="logo">
                <img src="@/assets/imgs/3/logo.png">
                <span>DART数据大屏</span>
                <div class="user-info">
                    <span>
                        欢迎回来
                        <template v-if="useCompDataStoreHook().onlineInfo">，
                            {{ useCompDataStoreHook().onlineInfo.currentUser?.realName }}
                            {{ useCompDataStoreHook().onlineInfo.judgerMaster ? '裁判长' : '裁判员' }}
                        </template>
                        ！
                    </span>
                </div>
            </div>
            <div class="sub-title">
                <span>湖南网络攻防邀请赛：{{ useCompSettingStoreHook().pageIndex === 1 ? '初赛' : '决赛' }}</span>
            </div>
            <div>
                <Settings v-model:page="useCompSettingStoreHook().pageIndex"/>
            </div>
        </header>
        <div class="page-wrap">
            <transition name="left">
                <section class="main flex main-page" v-show="useCompSettingStoreHook().pageIndex === 1" key="manPage">
                    <div class="flex-col h-100">
                        <div class="flex-col flex-2">
                            <h3 class="title1">在线总人数</h3>
                            <div class="flex-sb">
                                <StatNumber label="在线总人数统计" bg-color="transparent" style="margin: .2rem 0 .3rem"
                                            :cnt-num="useCompDataStoreHook().onlineInfo?.total??0"/>
                                <StatNumber label="成功提交总队伍数" bg-color="transparent" style="margin: .2rem 0 .3rem"
                                            icon="8"
                                            :cnt-num="useCompDataStoreHook().totalSubmitGroupCnt??0"/>
                                <StatNumber label="在线容器数统计" bg-color="transparent" style="margin: .2rem 0 .3rem"
                                            icon="5"
                                            :cnt-num="useCompDataStoreHook().onlineInfo?.containerCnt??0"/>
                            </div>
                            <div class="sys-source-wrap flex-col flex-1">
                                <ResourceLine2 class="flex-1"
                                               title="运行负载" sub-title=""
                                               :machine-list="useCompDataStoreHook().compMachineList1"/>
                            </div>
                        </div>
                        <div class="flex-col h-0 flex-1-5">
                            <h3 class="title1" style="margin:.3rem 0 .2rem;">FLAG提交情况</h3>
                            <div class="box flex-1 flex-col h-0">
                                <FlagGridList class="flex-1" :titles="['题目','队伍','运行得分','时间']"
                                              :fields="['name','team','score','time']"
                                              :data-list="useCompDataStoreHook().flagScoreList"/>
                            </div>
                        </div>
                    </div>
                    <div class="flex-col h-100">
                        <div class="flex-col flex-2  h-0" style="position:relative;box-sizing: border-box">
                            <h3 class="title2" style="margin:0 0 .3rem">总分排行</h3>
                            <GridList2 class="flex-1" :data-fn="useCompDataStoreHook().loadTotalRanking" modify-field="totalSubmitGroupCnt"/>
                        </div>
                        <div class="flex-col h-0 flex-1-5">
                            <h3 class="title1" style="margin: .3rem 0 .2rem 0;">算法运行情况</h3>
                            <div class="box flex-1 flex-col h-0">
                                <RecGridList class="flex-1" :titles="['队伍','运行F1值','时间']"
                                             :fields="['team','score','time']"/>
                            </div>
                        </div>
                    </div>
                    <div class="flex-col">
                        <h3 class="title2" style="margin:0 0 .3rem">CTF题排行</h3>
                        <GridList2 class="flex-1" :data-fn="useCompDataStoreHook().loadCftRanking"/>
                        <h3 class="title2" style="margin:.5rem 0 .3rem">数据分析题排行</h3>
                        <GridList2 class="flex-1" :data-fn="useCompDataStoreHook().loadDataAnalyzeRank"/>
                    </div>
                </section>
            </transition>
            <transition name="right" v-if="useCompSettingStoreHook().hasPageTwo">
                <section class="main flex sub-page" v-show="useCompSettingStoreHook().pageIndex === 2" key="subPage">
                    <div class="flex-col">
                        <div class="flex-col flex-2">
                            <h3 class="title1">在线总人数</h3>
                            <div class="flex-sb">
                                <StatNumber label="在线总人数统计" bg-color="transparent" style="margin: .2rem 0 .3rem"
                                            :cnt-num="useCompDataStoreHook().onlineInfo?.total??0"/>
                                <StatNumber label="成功提交总队伍数" bg-color="transparent" style="margin: .2rem 0 .3rem"
                                            icon="8"
                                            :cnt-num="useCompDataStoreHook().totalFinalSubmitGroupCnt??0"/>
                                <StatNumber label="在线容器数统计" bg-color="transparent" style="margin: .2rem 0 .3rem"
                                            icon="5"
                                            :cnt-num="useCompDataStoreHook().onlineInfo?.containerCnt??0"/>
                            </div>
                            <div class="sys-source-wrap flex-col flex-1">
                                <ResourceLine2 class="flex-1" style="margin-top: .1rem;"
                                               title="运行负载" sub-title=""
                                               :machine-list="useCompDataStoreHook().compMachineList2"/>
                            </div>
                        </div>
                        <div class=" flex-1-3 flex-col box" style="height: 0">
                            <GridList3 class="flex-1" :bug-flag-list="useCompDataStoreHook().allBugfixFlagList"/>
                        </div>
                    </div>
                    <div class="flex-col h-100 ">
                        <h3 class="title2" style="margin:0 0 .3rem">总分排行</h3>
                        <GridList2 class="flex-1" :data-fn="useCompDataStoreHook().loadFinalTotalRanking" modify-field="totalFinalSubmitGroupCnt"/>
                    </div>
                    <div class="flex-col">
                        <h3 class="title2" style="margin:0 0 .3rem">攻击得分排行</h3>
                        <GridList2 class="flex-1" :data-fn="useCompDataStoreHook().loadFinalFlagRanking"/>
                        <h3 class="title2" style="margin:.5rem 0 .3rem">防守得分排行</h3>
                        <GridList2 class="flex-1" :data-fn="useCompDataStoreHook().loadFinalBugfixRanking"/>
                    </div>
                </section>
            </transition>
        </div>
    </div>
</template>

<script setup lang="ts">
import Settings from "@/views/visual3/components/Settings.vue";
import StatNumber from "@/views/visual3/components/chart/StatNumber.vue";
import FlagGridList from "@/views/visual3/components/chart/FlagGridList.vue";
import RecGridList from "@/views/visual3/components/chart/RecGridList.vue";
import GridList2 from "@/views/visual3/components/chart/GridList2.vue";
import GridList3 from "@/views/visual3/components/chart/GridList3.vue";
import ResourceLine2 from "@/views/visual3/components/chart/ResourceLine2.vue";
import {onMounted} from "vue";
import {useCompSettingStoreHook} from "@/store/modules/compSetting";
import {useCompDataStoreHook} from "../../store/modules/compData";

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
    height: 1.1rem;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: linear-gradient(to right, rgba(14, 31, 55, 0.9), rgba(13, 29, 52, 0.8) 50%, rgba(12, 22, 38, 0.8) 100%);
    margin-bottom: .4rem;
    box-shadow: 0 -.2rem .5rem #091421;

    .logo {
        position: relative;
        z-index: 9;
        display: flex;
        align-items: center;
        padding-left: .5rem;
        user-select: none;
        pointer-events: none;

        img {
            width: 1.55rem;
        }

        span {
            font-weight: bold;
            margin-left: .35rem;
            font-size: .34rem;
            letter-spacing: .005rem;
        }
    }

    .sub-title {
        color: #ffffff;
        margin-left: .35rem;
        font-size: .39rem;
        font-weight: bold;
        font-family: "阿里妈妈数黑体";
        background: url("@/assets/imgs/3/icon7.png") no-repeat center/cover;
        padding: .1rem .5rem;
        letter-spacing: .02rem;
        text-shadow: 0 0 .1rem rgba(239, 239, 239, .5);
        display: flex;
        align-items: center;

        span {
            line-height: 1;
            margin-top: -.06rem;
        }
    }

    .user-info {
        display: flex;
        align-items: flex-end;
        margin-left: .8rem;
        position: relative;
        background: url("@/assets/imgs/3/icon6.png") no-repeat center/cover;
        padding: .08rem .08rem .08rem .716rem;
        min-width: 4.6rem;

        span {
            margin-left: .1rem;
            padding: .2rem .5rem;
            border-radius: .22rem;
            display: block;
            font-size: .25rem;
            color: #feeb00;
            font-family: "AlimamaShuHeiTiBold";
            font-style: italic;
        }
    }


}

.main {
    position: relative;
    z-index: 9;
    padding: .1rem;
    box-sizing: border-box;
    align-items: stretch;


    &:before {
        position: absolute;
        inset: 0;
        content: '';
        background: url("@/assets/imgs/2/bg-grid.png") -3rem 0rem / 60% no-repeat;
        z-index: -1;
        opacity: .2;

    }
}


.page-wrap {
    height: calc(100% - 1.1rem);
    max-height: calc(100% - 1.1rem);
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
            flex: 500;
        }

        &:nth-of-type(2) {
            flex: 500;
        }

        &:nth-of-type(3) {
            flex: 500;
        }
    }
}

.sub-page {
    justify-content: space-around;
    padding: .06rem .45rem .8rem .35rem;
    position: relative;


    > div {
        margin: 0 .35rem;

        &:nth-of-type(1) {
            flex: 500;
        }

        &:nth-of-type(2) {
            flex: 500;
        }

        &:nth-of-type(3) {
            flex: 500;
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
    padding: .3rem .3rem .3rem .3rem;

    &:before {
        position: absolute;
        z-index: -1;
        content: '';
        inset: 0;
        background: rgba(82, 116, 205, 0.06);
        border-radius: .2rem;
    }

    &.no-bg {
        &:before {
            display: none !important;
        }
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
    font-size: .26rem;
    font-weight: 400;

    &:before {
        position: absolute;
        content: '';
        left: 0;
        top: 50%;
        width: .06rem;
        height: .22rem;
        background: #5297f8;
        transform: translateY(-50%);
    }
}

.sys-source-wrap {
    position: relative;
}
</style>
