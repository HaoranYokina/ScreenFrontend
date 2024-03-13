<template>
    <div class="com-container">
        <div class="table-wrap">
            <div class="header">
                <div v-for="(item,i) in ['队伍','成绩','排名']" :class="{'flex-2':item==='队员' || item === '队伍'}"
                     :key="i">
                    <span>{{ item }}</span>
                </div>
            </div>
            <div class="body">
                <div class="tr" v-for="(row,i) in dataList" :key="i">
                    <div class="td flex-2">
                        <div>
                            {{ row.team }}
                        </div>
                    </div>
                    <div class="td">
                        <span>
                            {{ row.score }}
                        </span>
                        <em>分</em>
                    </div>
                    <!--                    <div class="td flex-2">
                                            <div>
                                                {{ row.user }}
                                            </div>
                                        </div>-->
                    <div class="td">
                        <span v-if="i<=2">
                            NO.{{ i + 1 }}
                        </span>
                        <strong v-else>
                            {{ i }}
                        </strong>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {useCompDataStoreHook} from "@/store/modules/compData";
import {reactive, ref, watchEffect} from "vue";

const dataList = reactive([
    {time: '2023-12-13 11:12:12', user: '队员1、队员2、队员3、队员3、队员3', team: '勇闯天涯战队', score: 120},
    {time: '2023-12-13 11:12:12', user: '队员1、队员2、队员3', team: '魔幻战队', score: 120},
    {time: '2023-12-13 11:12:12', user: '队员1、队员2、队员3、队员3', team: '第一支队伍', score: 120},
    {time: '2023-12-13 11:12:12', user: '队员1、队员2、队员3、队员3、队员3', team: '第一支队伍', score: 120},
    {time: '2023-12-13 11:12:12', user: '队员1、队员2、队员3、队员3、队员3', team: '第一支队伍', score: 120},
    {time: '2023-12-13 11:12:12', user: '队员1、队员2、队员3、队员3、队员3', team: '第一支队伍', score: 120},
    {time: '2023-12-13 11:12:12', user: '队员1、队员2、队员3、队员3、队员3', team: '第一支队伍', score: 120},
    {time: '2023-12-13 11:12:12', user: '队员1、队员2、队员3、队员3、队员3', team: '第一支队伍', score: 120},
    {time: '2023-12-13 11:12:12', user: '队员1、队员2、队员3、队员3、队员3', team: '第一支队伍', score: 120},
    {time: '2023-12-13 11:12:12', user: '队员1、队员2、队员3、队员3、队员3', team: '第一支队伍', score: 120},
    {time: '2023-12-13 11:12:12', user: '队员1、队员2、队员3、队员3、队员3', team: '第一支队伍', score: 120},
    {time: '2023-12-13 11:12:12', user: '队员1、队员2、队员3、队员3、队员3', team: '第一支队伍', score: 120},
    {time: '2023-12-13 11:12:12', user: '队员1、队员2、队员3、队员3、队员3', team: '第一支队伍', score: 120},
    {time: '2023-12-13 11:12:12', user: '队员1、队员2、队员3、队员3、队员3', team: '第一支队伍', score: 120},
])


</script>

<style scoped lang="scss">
.com-container {
    height: 0;
    display: flex;
    flex-direction: column;

}

.table-wrap {
    overflow-y: auto;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    scrollbar-width: none;
    &::-webkit-scrollbar {
        display: none;
    }

    .header {
        display: flex;
        justify-content: space-between;
        position: relative;

        > div {
            flex: 1;
            position: relative;
            text-align: center;
            padding-bottom: .2rem;

            &.flex-2 {
                flex: 2;
            }

            > span {
                display: inline-block;
                font-size: .22rem;
            }

            &:before {
                position: absolute;
                content: '';
                left: 0;
                bottom: 0;
                width: 100%;
                height: .02rem;
                background: #063162;
            }

            &:after {
                position: absolute;
                content: '';
                left: 50%;
                bottom: 0;
                width: 30%;
                transform: translateX(-50%);
                height: .03rem;
                /*background: #0064ed;*/
            }
        }
    }

    .body {
        flex: 1;
        margin-top: .3rem;
        overflow-y: auto;
        /* 自定义滚动条样式 */
        &::-webkit-scrollbar {
            width: 5px; /* 设置滚动条宽度 */
        }

        &::-webkit-scrollbar-thumb {
            background-color: #4794f1; /* 设置滚动条滑块颜色 */
            border-radius: 5px; /* 设置滚动条滑块圆角 */
        }

        &::-webkit-scrollbar-track {
            background-color: rgba(4, 19, 38, 0.2); /* 设置滚动条轨道颜色 */
            box-shadow: 0 0 10px rgba(4, 19, 38, 0.1) inset;
        }
    }

    .tr {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        text-align: center;
        margin: .2rem 0;
        font-size: .2rem;
        background-size: contain;


        &:nth-of-type(1) {
            background: linear-gradient(to right, rgba(219, 169, 66, 0.8), rgba(219, 169, 66, 0.1) 70%, rgba(219, 169, 66, 0));

            .td {
                &:last-of-type {
                    font-style: italic;
                    font-weight: 1200;
                    color: rgba(219, 169, 66, 1);
                }
            }
        }

        &:nth-of-type(2) {
            background: linear-gradient(to right, rgba(214, 140, 108, 0.8), rgba(214, 140, 108, 0.1) 70%, rgba(214, 140, 108, 0));

            .td {
                &:last-of-type {
                    font-style: italic;
                    font-weight: 1200;
                    color: rgba(214, 140, 108, 1);
                }
            }
        }

        &:nth-of-type(3) {
            background: linear-gradient(to right, rgba(52, 137, 225, 0.8), rgba(52, 137, 225, 0.1) 70%, rgba(52, 137, 225, 0));

            .td {
                &:last-of-type {
                    font-style: italic;
                    font-weight: 1200;
                    color: rgba(52, 137, 225, 1);
                }
            }
        }

        &:last-of-type {
            margin-bottom: 0;
        }

        .td {
            width: 0;
            flex: 1;
            padding: .06rem 0;
            flex-flow: wrap;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;

            &.flex-2 {
                flex: 2;
            }

            > div {
                width: 100%;
                font-size: .2rem;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            > span {
                display: inline-block;
                font-size: .2rem;
                white-space: nowrap;
            }

            &:nth-of-type(2) {
                > span {
                    font-weight: 900;
                    font-size: .28rem;
                }

                > em {
                    display: inline-block;
                    font-size: .22rem;
                    font-style: normal;
                }
            }

            &:last-of-type {
                color: #FFFFFF;

                > span {
                    font-weight: 900;
                    font-size: .25rem;
                }
            }
        }
    }
}

</style>
