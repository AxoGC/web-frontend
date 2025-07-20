<script setup>
import { ref, watch } from 'vue'
import { rowGroups } from './index.data'

const groups = rowGroups.map( ({ title, links }) =>
  ({
    title,
    links: links.map(([title, url]) =>
      ({ title, url })
    )
  })
)

console.log('rowGroups',rowGroups)
console.log('groups',groups)



// 处理页面宽度
import { useWindowSize } from '@vueuse/core'
const { width } = useWindowSize()
const isMobile = ref(width.value <= 856)
watch(width, (newValue) => {
  isMobile.value = newValue <= 856
})
</script>

<template>
  <div class="footer-out">
    <div class="footer-layout" :style="{ 'min-width': isMobile ? '100%' : '80%' }">
      <div class="link-group" v-for="(group, index) in groups" :key="index" style="margin-bottom: 1.5rem;">
        <div class="link-title">{{ group.title[$i18n.locale] }}</div>
        <a class="footer-link" v-for="link in group.links" :key="link.title" :href="link.url">{{ link.title }}</a>
      </div>
    </div>
    <a class="footer-link footer-beian" href="https://beian.miit.gov.cn/" target="_blank">
      备案号: 豫ICP备2023025148号
    </a>
  </div>
</template>


<style scoped>
.footer-out{
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1.5rem;
}

.footer-layout{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1.5rem;
  padding: 0 2rem
}

.link-group{
  display: flex;
  flex-direction: column;
  font-size: 12px;
  gap: 0.6rem;
}

.link-title{
  color: rgba(0, 0, 0, 0.88);
  font-weight: 400;
  font-size: 13px;
}

.footer-link{
  color: rgba(0, 0, 0, 0.72);
  transition: 0.25s;
  &:hover{
    text-decoration: underline;
  }
}

.footer-beian{
  color: rgba(0, 0, 0, 0.72);
  font-size: 11px;
}
</style>