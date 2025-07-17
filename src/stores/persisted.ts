import {useCssVar} from '@vueuse/core'
import { defineStore } from 'pinia'
import {computed, ref, watch} from 'vue'
import {useI18n} from 'vue-i18n'

const usePersistedStore = defineStore('persisted', () => {
  const token = ref<string|null>(null)
  const locale = ref('zh')

  watch(locale, value => {
    useI18n().locale.value = value
  })

  const darkMode = ref('auto')
  const themeColor = useCssVar('--primary')
  const transition = ref('el-fade-in-linear')
  const fontSize = useCssVar('--font-size')
  const fontFamily = useCssVar('--font-family')
  const apiAddr = ref('https://axogc.net:520')
  const fileAddr = computed(() => `${apiAddr.value}/file`)
  const imgAddr = computed(() => `${apiAddr.value}/file`)
  return {token, locale, darkMode, themeColor, transition, fontSize, fontFamily, apiAddr, fileAddr, imgAddr}
}, {persist: true})

export default usePersistedStore
