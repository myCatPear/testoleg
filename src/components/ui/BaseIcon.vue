<script setup>
import { computed } from 'vue'
import { getSvgIcon } from '@/utils/icons'

const props = defineProps({
  name: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: '24'
  },
  color: {
    type: String,
    default: 'currentColor'
  },
  width: {
    type: String,
    default: '24'
  },
  height: {
    type: String,
    default: 'auto'
  },
  type: {
    type: String,
    default: 'svg'
  }
})

const width = computed(() => {
  return props.size ? `${props.size}px` : `${props.width}px`
})
const height = computed(() => {
  return props.size ? `${props.size}px` : `${props.height}px`
})
</script>

<template>
  <div
    v-if="getSvgIcon(props.name)"
    class="base-icon"
    :style="{
      width,
      height,
      color: props.color
    }"
    v-html="getSvgIcon(props.name)"
  />
</template>

<style lang="scss" scoped>
:deep(svg) {
  width: 100%;
  height: 100%;

  path {
    fill: currentColor;
  }
}
</style>
