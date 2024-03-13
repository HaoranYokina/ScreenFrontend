<template>
    <svg viewBox="0 0 100 10">
        <polyline points="4.2,0.8 1,4 99,4" :stroke="props.lineColor" stroke-width=".26"
                  fill="transparent"></polyline>
        <polyline points="7,6.2 35,6.2 38.2,4" :stroke="props.lineColor" stroke-width=".26"
                  fill="transparent"></polyline>
    </svg>
</template>

<script setup lang="ts">
const props = defineProps({
    lineColor: {
        type: String,
        default: '#4392e4'
    }
})
</script>
