import { ref, watch } from 'vue'
import { APPEARANCE_KEY } from '@/assets/constants'

const isDarkTheme = ref(false)

export function initAppearance() {
  const preference = localStorage.getItem(APPEARANCE_KEY) || ''
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  if (!preference || preference === 'auto' ? prefersDark : preference === 'dark') {
    document.documentElement.classList.add('dark')
  }
}

watch(isDarkTheme, () => {
  if (isDarkTheme.value) {
    document.documentElement.classList.add('dark')
    localStorage.setItem(APPEARANCE_KEY, 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem(APPEARANCE_KEY, '')
  }
})

export function useAppConfig() {
  return {
    isDarkTheme,
    initAppearance
  }
}
