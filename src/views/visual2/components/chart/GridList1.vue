<template>
    <div class="h-100">
        <div class="flex  search-in-wrap">
            <div class="flex-1 search-in">
                <input class="" placeholder="搜索课程任务" v-model.trim="useDataStoreHook().courseAssignmentSearchKey">
            </div>
            <div class="btn flex-center" @click="search">搜索</div>
        </div>

        <div style="margin-top: .3rem">
            <DropDown v-model:data="dataStore.selectCourseAssignmentOptions" style="width: calc(100% - 1.64rem);"
                      placeholder="选择课程任务" :ex-width="-22"
                      :options="options" :multiple="true" @change="changeData" ref="dropDownRef"/>
        </div>
        <div class="selected-wrap"
             v-show="dataStore.selectCourseAssignmentOptions && dataStore.selectCourseAssignmentOptions.length">
            <h3>已选</h3>
            <div>
                <el-tag closable v-for="(item,i) in dataStore.selectCourseAssignmentOptions" @close="closeItem(item)">
                    {{ item.label }}
                </el-tag>
            </div>
        </div>
        <div class="table-wrap"
             :style="{maxHeight:`calc(100vh - ${dataStore.selectCourseAssignmentOptions && dataStore.selectCourseAssignmentOptions.length?'7.08rem':'5.1rem'} )`}">
            <div class="header">
                <div v-for="(item,i) in dataStore.coursePointList.titles" :key="i">
                    <span>{{ item }}</span>
                </div>
            </div>
            <div class="tr" v-for="(row,i) in dataStore.coursePointList.dataList" :key="i">
                <div class="td">
										<span>
												{{ row.score }}
											<em>分</em>
										</span>
                </div>
                <div class="td" style="white-space: nowrap">
										<span>
												{{ row.realName }}
										</span>
                </div>
                <div class="td">
										<span>
												{{ map[row.attr] ?? row.attr }}
										</span>
                </div>
                <div class="td">
										<span>
												{{ row.time }}
										</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import DropDown from "@/views/visual2/components/DropDown.vue";
import {ElTag} from "element-plus";
import {useDataStoreHook} from "@/store/modules/data";
import {ref, watchEffect} from "vue";

const options = useDataStoreHook().courseAssignments
const dataStore = useDataStoreHook()
const dropDownRef = ref(null)
const map = {
    'personal': '个人',
    'group': '小组',
    'everyone': '全体'
}

let hasSearch = false

const search = async () => {
    hasSearch = true
    await useDataStoreHook().loadCourseAssignmentPage()
    dropDownRef.value.focus()
}

let timer
const changeData = () => {
    clearTimeout(timer)
    timer = setTimeout(() => {
        loadData()
    }, 200)
}

const loadData = () => {
    useDataStoreHook().loadCoursePointPage()
}

const closeItem = (val) => {
    dataStore.selectCourseAssignmentOptions.splice(dataStore.selectCourseAssignmentOptions.findIndex(item => item === val), 1)
    changeData()
}

</script>

<style scoped lang="scss">

.search-in-wrap {
    margin-top: .38rem;
    align-items: stretch;
}

.search-in {
    width: 100%;
    margin-right: .76rem;
    padding: 0.01rem 0;

    input {
        width: 100%;
        height: 100%;
        border: 0;
        padding: 0 .2rem;
        box-shadow: 0 0 .06rem .05rem #00467a;
        border-radius: .12rem;
        background: #081734;
        color: #ffffff;
        font-size: .2rem;
        transition: all .6s;

        &::placeholder {
            color: #66666b;
        }

        &:focus {
            box-shadow: 0 0 .06rem .05rem #0d609d;
        }
    }
}

.btn {
    width: 1.25rem;
    height: .48rem;
    font-size: .22rem;
    background: linear-gradient(to right bottom, #00b7ff, #178dff);
    color: #ffffff;
    border-radius: .16rem;
    cursor: pointer;
}

.selected-wrap {
    margin-top: .5rem;

    h3 {
        font-size: .22rem;
        font-weight: normal;
    }

    > div {
        max-height: 1.2rem;
        overflow-y: auto;

        &::-webkit-scrollbar {
            display: none;
        }

        .el-tag {
            margin: .2rem .2rem 0 0;
            height: .38rem;
            font-size: .2rem !important;
            background: #080e25;
            color: #5d6072;
            border: none;
            border-radius: .3rem;
            padding: 0 .1rem;

            :deep(.el-tag__content) {
                font-size: .2rem;
                transform: scale(.8);
            }
        }
    }
}

.table-wrap {
    margin-top: .5rem;
    min-height: 3rem;
    max-height: calc(100vh - 6.9rem);
    overflow-y: auto;
    overflow-x: hidden;

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

            &:first-of-type {
                flex: initial;
                width: 1.7rem;
            }

            > span {
                display: inline-block;
                font-size: .2rem;
                transform: scale(.8);
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
                height: .02rem;
                background: #0064ed;
            }
        }
    }

    .tr {
        display: flex;
        justify-content: space-between;
        position: relative;
        text-align: center;
        margin: .41rem 0;
        font-size: .2rem;
        background: url("@/assets/imgs/2/icon3.png") no-repeat;
        background-size: contain;

        &:last-of-type {
            margin-bottom: 0;
        }

        .td {
            flex: 1;
            width: fit-content;
            overflow: hidden;
            text-overflow: ellipsis;
            padding: .10rem 0;

            &:first-of-type {
                flex: initial;
                width: 1.7rem;

                em {
                    display: inline-block;
                    font-size: .2rem;
                    transform: scale(.66);
                    font-style: normal;
                    font-weight: normal;
                }
            }

            &:first-of-type {
                span {
                    font-size: .22rem;
                    font-weight: bold;
                    transform: scale(1);
                }
            }

            > span {
                display: inline-block;
                font-size: .2rem;
                transform: scale(.8);
            }
        }
    }
}

</style>
