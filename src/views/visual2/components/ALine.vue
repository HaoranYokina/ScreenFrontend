<template>
    <svg viewBox="0 0 100 10">
        <polyline points="76,0 100,0 100,1.3 78.5,1.3 76,0" :stroke="props.lineColor" stroke-width=".2"
                  :fill="props.lineColor"></polyline>
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
