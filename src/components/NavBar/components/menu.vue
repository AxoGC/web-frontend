<script setup>
import { defineProps } from 'vue'

// 定义 props
const props = defineProps({
  isMobile: Boolean,
  data: Array,
})
</script>
<!-- 856px是一个锚点值 -->
<template>
    <div class="nav-menu">
      <div class="nav-in-layout" :style="{ 'min-width': isMobile?'100%':'80%' }">
        <div class="menu-list">
          <div class="nav-route" v-for="i in data">{{ i.label }}</div>
        </div>
      </div>
    </div>
</template>

<style>
.nav-menu{
  display: flex;
  justify-content: center;
  padding-bottom: 24px;
}
.nav-in-layout{
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}
.menu-list{
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.nav-route{
  cursor: pointer;
  transition: 0.25s;
  height: 100%;
  display: flex;
  align-items: center;
  &:hover{
    color: #000;
  }
}
</style>
