<script setup lang="ts">
import useSessionStore from '@/stores/session';
import NavBar from './NavBar.vue';
import {ref} from 'vue';

const session = useSessionStore()
const menuState = ref(false)
</script>

<template>
  <div class="h-full flex gap-3">

    <nav-bar class="shrink-0" />

    <!-- 中间内容区域 -->
    <div class="grow flex flex-col gap-2">

      <div class="flex justify-between mx-4 sm:hidden">
        <div class="font-bold">
          {{ $t('bbs.title') }}
        </div>
        <el-button @click="menuState=true">
          {{ $t('bbs.layout.openMenu') }}
        </el-button>
      </div>

      <div class="grow min-h-0">
        <router-view />
      </div>

    </div>

  </div>


  <!-- 左侧导航栏 -->
  <el-drawer v-model="menuState" body-class="p-0" size="50%">
    <nav-bar />
  </el-drawer>
</template>
