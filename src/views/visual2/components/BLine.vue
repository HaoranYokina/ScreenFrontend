<template>
    <svg viewBox="0 0 100 10">
        <polyline points="50,10 100,10 100,6" :stroke="props.lineColor" stroke-width="1.5"
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
