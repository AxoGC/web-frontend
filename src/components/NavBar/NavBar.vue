<script setup>
import { ref, watch, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useWindowSize } from '@vueuse/core'
import usePersistedStore from '@/stores/persisted'
import useSessionStore from '@/stores/session'
import NavMenu from './components/menu.vue'
import Collapse from './components/collapse.vue'
import { Menu, UserFilled } from '@element-plus/icons-vue'
import { navbarItems, langurages } from './index.data'

// 响应式状态
const isDrawerOpen = ref(false)
const persisted = usePersistedStore()
const session = useSessionStore()

// 路由相关
const route = useRoute()
const router = useRouter()
console.log('route', route)

const linkTo = (item) => {
  router.push({ path: item.index })
}

// 菜单显示控制
const showMenu = ref(false)
const showMenuList = ref({
  showLagurageMenu: false
})
const onMouseleave = () => {
  showMenu.value = false
  showMenuList.value.showLagurageMenu = false
}

// 动态计算 nav-out 高度
const navHeight = ref('48px') // 默认高度为导航栏基础高度
const collapseRef = ref(null)
const showMobileMenu = ref(false)

const updateNavHeight = async () => {
  if (showMenu.value || showMenuList.value.showLagurageMenu || showMobileMenu.value) {
    await nextTick() // 等待 DOM 更新
    const navMenu = document.querySelector('.nav-ex')
    if (navMenu) {
      const menuHeight = navMenu.scrollHeight
      navHeight.value = `${menuHeight + 48}px` // 加上导航栏基础高度
    }
  } else {
    navHeight.value = '48px' // 收起时恢复默认高度
  }
}

// 监听菜单状态变化，更新高度
watch([showMenu, () => showMenuList.value.showLagurageMenu], () => {
  updateNavHeight()
}, { immediate: true })

// 防抖函数
const debounce = (fn, delay) => {
  let timer = null
  return (...args) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}

// collapse 方法
const collapse = debounce(async(event) => {
  showMobileMenu.value = collapseRef.value.value
  console.log('Collapse 方法触发', event)
  if (collapseRef.value) {
    
  }
}, 10)
watch(showMobileMenu, () => {
  updateNavHeight()
}, { immediate: true })



// 处理页面宽度
const { width } = useWindowSize()
const isMobile = ref(width.value <= 856)
watch(width, (newValue) => {
  isMobile.value = newValue <= 856
  if(!isMobile.value && collapseRef.value){
    showMobileMenu.value = collapseRef.value.value = false
  }
})
</script>

<template>
  <div class="nav-out" :class="{ 'nav-open': showMenu && showMenuList.showLagurageMenu }" :style="{ height: navHeight }" @mouseleave="onMouseleave" >
    <div style="display: flex; justify-content: center; height: 48px;">
      <div class="nav-in-layout" :style="{ 'min-width': isMobile ? '100%' : '80%' }">

        <div class="nav-flex" v-if="!isMobile">
          <img src="@/assets/logo.png" style="height: 22px; aspect-ratio: 1/1;" />
          <div class="nav-route" v-for="nav in navbarItems" :key="nav.index" @click="linkTo(nav)">
            {{ nav.label.zh }}
          </div>
        </div>
        <div v-if="!isMobile">
          <div class="nav-route" @mouseenter="showMenuList.showLagurageMenu = showMenu = true">语言</div>
        </div>


        <div class="nav-flex" v-if="isMobile">
          <img src="@/assets/logo.png" style="height: 22px; aspect-ratio: 1/1;" />
        </div>
        
        <div v-if="isMobile">
          <Collapse @click="collapse" ref="collapseRef" style="transform: scale(0.5);"/>
        </div>

      </div>
    </div>


    <Transition name="fade">
      <nav-menu class="nav-ex" v-if="showMenu && showMenuList.showLagurageMenu" :isMobile="isMobile" :data="langurages" :type="'langurage'"/>
    </Transition>

    <Transition name="fade">
      <nav-menu class="nav-ex" v-if="showMobileMenu" :isMobile="isMobile" :data="navbarItems" :type="'nav'" style="height: calc(100vh - 48px);"/>
    </Transition>
  </div>
</template>

<style scoped>
.nav-out {
  font-size: 13px;
  color: rgba(0, 0, 0, 0.8);
  background: #f0f0f0c4;
  z-index: 999;
  backdrop-filter: saturate(180%) blur(20px);
  position: relative;
  overflow: hidden;
  transition: height 0.35s ease;
}

.nav-in-layout {
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 48px;
}

.nav-flex {
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
  height: 100%;
  align-items: center;
}

.nav-route {
  cursor: pointer;
  transition: 0.25s;
  height: 100%;
  display: flex;
  align-items: center;
  &:hover{
    color: #000;
  }
}

/* 自定义进入和离开动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
