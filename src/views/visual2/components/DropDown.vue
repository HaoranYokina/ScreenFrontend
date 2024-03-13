<template>
    <div class="box" ref="selectRef">
        <el-select
            v-model="checkVal"
            collapse-tags
            :multiple="props.multiple"
            :placeholder="props.placeholder"
            style="width: 100%"
            filterable
            clearable
            no-data-text="无数据"
            no-match-text="无匹配数据"
            @change="onChange"
            ref="selectRef2"
            value-key="value"
        >
            <el-option
                v-for="item in props.options"
                :key="item.label"
                :label="item.label"
                :value="item"
                :style="{width: optionWidth}"
            />
            <!--<el-option disabled >
                加载更多...
            </el-option>-->
        </el-select>
    </div>
</template>

<script setup lang="ts">
import 'element-plus/dist/index.css'
import {ElOption, ElSelect} from 'element-plus'
import {ref, watchEffect} from "vue";
import {useSettingStoreHook} from "@/store/modules/setting";

const props = defineProps({
    options: {
        type: Array,
        default: []
    },
    multiple: {
        type: Boolean,
        default: false
    },
    data: {
        type: [Object, String, Number]
    },
    placeholder: {
        type: String,
        default: ''
    },
    exWidth: {
        type: Number,
        default: -4
    }
})

const selectRef = ref(null)
const selectRef2 = ref(null)

const optionWidth = ref('300px')

const emit = defineEmits(['update:data', 'change'])

const checkVal = ref(props.data)

const onChange = (val) => {
    //console.log(val, checkVal.value)
    emit('update:data', checkVal.value)
    emit('change', val)
}


defineExpose({
    focus: () => {
        selectRef2.value.focus()
    }
})

watchEffect(() => {
    if (useSettingStoreHook().pageIndex) {
        setTimeout(() => {
            optionWidth.value = `${selectRef.value.querySelector('.el-input__wrapper').offsetWidth + props.exWidth}px`
        }, 300)
    }
})


</script>
<style lang="scss">

.el-popper {
    background: rgba(5, 20, 49, 0.8) !important;
    padding: .1rem .2rem !important;
    color: #ffffff !important;
    border: .1rem solid transparent !important;

    box-shadow: 0 0 .06rem .05rem #00467a !important;
}

.el-select-dropdown__item {
    padding: 0 .1rem !important;
    color: #ffffff !important;
    margin: .1rem 0 !important;
    border-radius: .1rem !important;
}

.el-select-dropdown__item.hover {
    background: #69b6f7 !important;
}

.el-select-dropdown__item.selected {
    background: linear-gradient(to right, #69b6f7, #427ee5) !important;
}

.el-popper__arrow {
    &:before {
        background: rgba(5, 20, 49, 1) !important;
        display: none;
    }
}

</style>
<style scoped lang="scss">
.box {
    margin-top: .2rem;
}

:deep(.el-select) {
    box-shadow: 0 0 .06rem .05rem #00467a;
    outline: none;
    border-radius: .12rem;
    height: .48rem;
    font-size: .2rem;

    .el-input__wrapper {
        background: #081734;
        border-radius: .12rem;
        box-shadow: none;
        padding: 0 .2rem;

        .el-input__inner {
            height: .48rem !important;
            font-size: .2rem;
            color: #ffffff;

            &::placeholder {
                color: #66666b;
            }
        }
    }

    &:hover {
        border: none;
        box-shadow: none;
    }

    .select-trigger {
        height: max-content !important;
    }

    .el-tag {
        background: #5f8ce3;
        color: #ffffff;
        height: .38rem;
    }

    .el-input__suffix-inner {
        i {
            color: #6ba9f9;
        }
    }
}

</style>
