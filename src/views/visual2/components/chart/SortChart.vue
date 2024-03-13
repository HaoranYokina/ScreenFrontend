<template>
    <div class="container flex h-100">
        <div class="flex-1">
            <DropDown v-model:data="dataStore.selectStudentOptions" style="width: 90%" :options="options"
                      :ex-width="-22" placeholder="选择学员" @change="onChange"/>
        </div>
        <div class="flex-1 sort-wrap">
            <div>
                <div class="inner">
                    <div class="tag">
                        <div>
                            CPU
                            <span class="point"></span>
                            <span class="point"></span>
                        </div>
                    </div>
                    <div class="name">
                        {{ useDataStoreHook().oneStudentResourceStat.user.realName || useDataStoreHook().oneStudentResourceStat.user.username }}
                    </div>
                    <div class="per">
                        <span>总消耗</span>
                        <em>{{ useDataStoreHook().oneStudentResourceStat.cpuPercentage }}</em>
                    </div>
                    <div class="per">
                        <span>No.</span>
                        <em>{{ useDataStoreHook().oneStudentResourceStat.cpuRankNo }}</em>
                    </div>
                </div>
                <ALine line-color="#fbe66c"/>
            </div>
            <div>
                <div class="inner">
                    <div class="tag">
                        <div>
                            磁盘
                            <span class="point"></span>
                            <span class="point"></span>
                        </div>
                    </div>
                    <div class="name">
                        {{ useDataStoreHook().oneStudentResourceStat.user.realName || useDataStoreHook().oneStudentResourceStat.user.username }}
                    </div>
                    <div class="per">
                        <span>总消耗</span>
                        <em>{{ useDataStoreHook().oneStudentResourceStat.diskPercentage }}</em>
                    </div>
                    <div class="per">
                        <span>No.</span>
                        <em>{{ useDataStoreHook().oneStudentResourceStat.diskRankNo }}</em>
                    </div>
                </div>
                <ALine line-color="#91fccd"/>
            </div>
            <div>
                <div class="inner">
                    <div class="tag">
                        <div>
                            内存
                            <span class="point"></span>
                            <span class="point"></span>
                        </div>
                    </div>
                    <div class="name">
                        {{ useDataStoreHook().oneStudentResourceStat.user.realName || useDataStoreHook().oneStudentResourceStat.user.username }}
                    </div>
                    <div class="per">
                        <span>总消耗</span>
                        <em>{{ useDataStoreHook().oneStudentResourceStat.memoryPercentage }}</em>
                    </div>
                    <div class="per">
                        <span>No.</span>
                        <em>{{ useDataStoreHook().oneStudentResourceStat.memoryRankNo }}</em>
                    </div>
                </div>
                <ALine line-color="#88e7fc"/>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import ALine from "@/views/visual2/components/ALine.vue";
import DropDown from "@/views/visual2/components/DropDown.vue";
import {useDataStoreHook} from "@/store/modules/data";

const options = useDataStoreHook().students
const dataStore = useDataStoreHook()
const onChange = () => {
    useDataStoreHook().loadUserInstanceRank()
}

</script>

<style scoped lang="scss">
.container {
    width: 100%;
    align-items: flex-start;
}

.sort-wrap {
    flex: 1.04;

    > div {
        position: relative;
        width: 100%;
        height: .8rem;
        margin-top: .14rem;
        border-radius: .02rem;


        > svg {
            position: absolute;
            top: 0;
            right: 0;
        }

        &:before, &:after {
            position: absolute;
            content: '';
            width: .02rem;
            height: .15rem;
            bottom: -.01rem;
            left: 37%;
            z-index: 9;
            border-radius: .2rem;
        }

        &:before {
            left: 68%;
            z-index: 9;
        }

        .inner {
            position: absolute;
            inset: 0.02rem;
            background: linear-gradient(to bottom, #0f2144, #0a1634);
            display: flex;
            align-items: center;
            font-size: .2rem;

            > div {
                flex: 1;
                text-align: center;

                &:nth-of-type(2) {
                    transform: scale(.92);
                }

                &:nth-of-type(3) {
                    span {
                        display: inline-block;
                        font-size: .2rem;
                        transform: scale(.66);
                    }

                    em {
                        font-style: normal;
                        font-weight: bold;
                        font-size: .22rem;
                    }
                }

                &:nth-of-type(4) {
                    span {
                        display: inline-block;
                        font-size: .2rem;
                        transform: scale(.7);
                    }

                    em {
                        font-weight: bold;
                        font-size: .37rem;
                    }
                }
            }

            .tag {
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;

                > div {
                    width: 70%;
                    height: 70%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: .25rem;
                    font-weight: bold;
                    position: relative;
                    box-shadow: 0 0 .2rem .05rem #14365a inset;

                    &:before, &:after, > .point {
                        content: '';
                        position: absolute;
                        width: .04rem;
                        height: .04rem;
                        background: red;
                        z-index: 9;
                    }

                    &:before {
                        left: -.01rem;
                        top: -.01rem;
                    }

                    &:after {
                        right: -.01rem;
                        top: -.01rem;
                    }

                    > .point:first-of-type {
                        left: -.01rem;
                        bottom: -.01rem;
                    }

                    > .point:last-of-type {
                        right: -.01rem;
                        bottom: -.01rem;
                    }
                }
            }
        }

        &:not(:first-of-type) {
            margin-top: .3rem;
        }

        &:nth-of-type(1) {
            background: linear-gradient(to bottom, #152a3e, #2c4a27);

            &:before, &:after {
                background: #fbe66c;
            }

            .inner {
                .tag {
                    > div {
                        border: .01rem solid rgba(251, 230, 108, 0.4);

                        &:before, &:after, > .point {
                            background: #fbe66c;
                        }


                    }
                }

                div {
                    &:nth-of-type(4) {
                        color: #fbe66c;
                    }
                }
            }
        }

        &:nth-of-type(2) {
            background: linear-gradient(to bottom, #0b253e, #1c4852);

            &:before, &:after {
                background: #91fccd;
            }

            .inner {
                .tag {
                    > div {
                        border: .01rem solid rgba(145, 252, 205, 0.4);

                        &:before, &:after, > .point {
                            background: #91fccd;
                        }
                    }
                }

                div {
                    &:nth-of-type(4) {
                        color: #91fccd;
                    }
                }
            }
        }

        &:nth-of-type(3) {
            background: linear-gradient(to bottom, #0d2240, #1d486f);

            &:before, &:after {
                background: #88e7fc;
            }

            .inner {
                .tag {
                    > div {
                        border: .01rem solid rgba(136, 231, 252, 0.4);

                        &:before, &:after, > .point {
                            background: #88e7fc;
                        }
                    }
                }

                div {
                    &:nth-of-type(4) {
                        color: #88e7fc;
                    }
                }
            }
        }
    }
}

</style>
