<template>
    <div class="flex-col">
        <DropDown v-model:data="dataStore.selectInstanceOptions" style="width: 100%;margin-top: .6rem"
                  :options="options" :ex-width="-22" placeholder="选择所要显示的实例" @change="onChange"/>
        <div class="chart-wrap flex-1">
            <RingChart title="CPU" color="#7fe961" :data="{cnt:useDataStoreHook().oneInstanceStat.cpuPercentage}"/>
            <RingChart title="内存" color="#f96bbd" :data="{cnt:useDataStoreHook().oneInstanceStat.memoryPercentage}"/>
            <RingChart title="磁盘" color="#25e6fa" :data="{cnt:useDataStoreHook().oneInstanceStat.diskPercentage}"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import DropDown from "@/views/visual2/components/DropDown.vue";
import RingChart from "@/views/visual2/components/chart/RingChart.vue";
import {useDataStoreHook} from "@/store/modules/data";

const options = useDataStoreHook().instances

const dataStore = useDataStoreHook()

const props = defineProps({
    color: {
        type: String,
        default: '#33b3d5'
    }
})

const onChange = (a) => {
    //console.log(useDataStoreHook().selectInstanceOptions)
    useDataStoreHook().loadInstanceResource()
}

</script>

<style scoped lang="scss">
.chart-wrap {
    display: flex;
    margin-top: .3rem;

    > div {
        flex: 1;
        display: flex;
        flex-direction: column;
        text-align: center;
        font-size: .25rem;

        .chart {
            flex: 1;
        }

        &:first-of-type {
            .chart {
            }
        }
    }
}
</style>
