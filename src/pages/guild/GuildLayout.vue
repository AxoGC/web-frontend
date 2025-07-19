<script setup lang="ts">
import GuildNavBar from './GuildNavBar.vue';
import {ref} from 'vue';

const menuState = ref(false)
</script>

<template>

  <div class="h-full flex gap-2">

    <!-- 桌面端导航栏 -->
    <guild-nav-bar class="shrink-0 max-sm:hidden" />

    <!-- 右侧内容区域 -->
    <div class="grow">
      <router-view />
    </div>
  </div>

  <!-- 移动端导航栏抽屉 -->
  <el-drawer v-model="menuState" body-class="p-0" size="50%">
    <guild-nav-bar />
  </el-drawer>
</template>
