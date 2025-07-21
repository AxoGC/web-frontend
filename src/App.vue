<script setup lang="ts">
import NavBar from '@/components/NavBar/NavBar.vue';
import AppFooter from '@/components/AppFooter/AppFooter.vue';
import FloatCard from './components/FloatCard.vue';

const web = window.location
console.log(web)
const getWebName = () => {
  let name = ''
  if(web.protocol === 'https:'){
    name = 'Axolotland'
  }else{
    switch (web.hostname) {
      case 'localhost':
        name = 'Axo-Developing'
        break
      default:
        name = web.hostname
    }
  }
  document.title = name
}
getWebName()
</script>

<template>
  <div class="fixed top-0 left-0 w-full z-[999]">
    <nav-bar />
  </div>
  <div class="h-[48px]"> </div>
  <el-config-provider :button="{ round: true }">
    <router-view></router-view>
  </el-config-provider>
  <app-footer v-if="!$route.meta.noFooter"></app-footer>
</template>
