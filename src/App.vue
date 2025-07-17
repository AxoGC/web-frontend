<script setup lang="ts">
import NavBar from './components/NavBar.vue';
import AppFooter from './components/AppFooter.vue';

</script>

<template>
  <div class="fixed top-0 left-0 w-full z-10">
    <nav-bar />
  </div>
  <div class="h-[60px]">
  </div>
  <router-view />
  <app-footer v-if="!$route.meta.noFooter" />
</template>
