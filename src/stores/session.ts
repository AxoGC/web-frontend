import {useBreakpoints} from '@vueuse/core'
import type { User } from '@/utils/tables'
import { defineStore } from 'pinia'
import {ref} from 'vue'
import {api} from '@/utils/axios'

import MarkdownIt from 'markdown-it'

const useSessionStore = defineStore('session',() => {
  const user = ref<User|null>(null)

  async function getMyInfo() {
    user.value = await api.get<any, User>('/myinfo')
  }

  const breakPoints = useBreakpoints({
    sm: 0,
    md: 768,
    lg: 1280,
  })
  const windowWidth = breakPoints.active()

  const md = ref<MarkdownIt>(new MarkdownIt())

  return {user, getMyInfo, windowWidth, md}
})

export default useSessionStore
