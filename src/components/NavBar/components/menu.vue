<script setup>
import { defineProps } from 'vue'

// 定义 props
const props = defineProps({
  isMobile: Boolean,
  data: Array,
  type: String,
})

const handleClick = (i) => {
  console.log(i)
}

console.log('123123121type',props.type)
const parseShow = (i) => {
  switch (props.type){
    case 'langurage':
    return i.label
    case 'nav':
    return i.label.zh
  }
}
</script>
<!-- 856px是一个锚点值 -->
<template>
    <div class="nav-menu">
      <div class="nav-in-layout" :style="{ 'min-width': isMobile?'100%':'80%' }">
        <div class="menu-list" :style="{ 'gap': isMobile?'1rem':'0.5rem', 'font-size': isMobile?'1.5rem':'', 'margin-top': isMobile?'2rem':'' }">
          <div class="nav-route" v-for="i in data" @click="handleClick(i)">{{ parseShow(i) }}</div>
        </div>
      </div>
    </div>
</template>

<style scoped>
.nav-menu{
  display: flex;
  justify-content: center;
  padding-bottom: 24px;
}
.nav-in-layout{
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: start;
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
