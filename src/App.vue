<script setup lang="ts">
import NavBar from '@/components/NavBar/NavBar.vue';
import AppFooter from '@/components/AppFooter.vue';

</script>

<template>
  <el-config-provider :button="{ round: true }" :card="{ shadow: 'hover' }">
    <div class="fixed top-0 left-0 w-full" style="z-index: 999;">
      <nav-bar />
    </div>
    <div style="height: 48px;"> </div>
    <router-view />
    <app-footer v-if="!$route.meta.noFooter" />
  </el-config-provider>
</template>
