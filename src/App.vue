<script setup lang="ts">
import { ref } from 'vue'
import ModalDialog from '@/components/ui/ModalDialog.vue'

const isShowDialog = ref(false)
</script>

<template>
  <ModalDialog v-model="isShowDialog" />
  <button @click="isShowDialog = true">open</button>
</template>

<style scoped></style>
