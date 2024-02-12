<script setup lang="ts">
import { onUnmounted } from 'vue'
import BaseIcon from '@/components/ui/BaseIcon.vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['update:modelValue'])

const clicked = (event: MouseEvent) => {
  console.log(event)
  const target = event.target as HTMLElement
  if (target.matches('.modal-dialog')) {
    emits('update:modelValue')
  }
}

document.addEventListener('click', clicked)

onUnmounted(() => {
  document.removeEventListener('click', clicked)
})
</script>

<template>
  <Teleport v-if="props.modelValue" to="body">
    <Transition>
      <div class="modal-dialog">
        <div class="modal-dialog__wrapper">
          <header class="modal-dialog__header">
            <BaseIcon name="icon-close" />
            `12`
          </header>
          <main class="modal-dialog__main"></main>
          <footer class="modal-dialog__footer"></footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss">
.modal-dialog {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  &__wrapper {
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  }
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.v-enter-active,
.v-leave-active {
  transition: 0.25s ease all;
}
</style>
