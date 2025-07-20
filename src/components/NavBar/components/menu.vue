<script setup>
import { defineProps, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowRightBold } from '@element-plus/icons-vue'
// 路由相关
const route = useRoute()
const router = useRouter()

// 定义 props
const props = defineProps({
  isMobile: Boolean,
  data: Array,
  type: String,
})
const emit = defineEmits(['resetMobileMenu'])

const hoveredItem = ref(-1)

const handleClick = (i) => {
  hoveredItem.value = -1
  switch (props.type){
    case 'langurage':
    break
    case 'nav':
    router.push({ path: i.index })
    emit('resetMobileMenu')
    break
  }
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
          <div class="nav-route" v-for="(i,index) in data" @click="handleClick(i)" @mouseenter="hoveredItem = index" @mouseleave="hoveredItem = -1"
            :style="{ 'display': isMobile?'flex':'', 'justify-content': isMobile?'space-between':'', 'align-items': isMobile?'center':'' }">
            <div>{{ parseShow(i) }}</div>
            <ArrowRightBold class="arrowIcon" :class="hoveredItem===index?'hoveredItem':''"/>
          </div>
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
  gap: 0.25rem;
  width: 100%;
}
.nav-route{
  cursor: pointer;
  transition: 0.25s;
  height: 100%;
  display: flex;
  align-items: center;
  flex-grow: 1;
  padding: 0.25rem 0;
  &:hover{
    color: #000;
  }
}

.arrowIcon{
  width: 1rem;
  aspect-ratio: 1/1;
  opacity: 1;
  animation: globalnav-chevron-slide-in-hover .24s cubic-bezier(.4,0,.6,1) both;
}

.hoveredItem{
  opacity: 0;
  animation: globalnav-chevron-hover-off .24s cubic-bezier(.4,0,.6,1) both;
}

@keyframes globalnav-chevron-slide-in-hover{
  0% {
    opacity: 1;
    transform: translate(0);
  }
  100% {
    opacity: 0;
    transform: translate(-4px);
  }
}

@keyframes globalnav-chevron-hover-off{
  0% {
    opacity: 0;
    transform: scale(.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
