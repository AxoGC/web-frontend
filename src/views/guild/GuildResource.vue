<script setup lang="ts">
import useStateStore from '@/stores/state';
import {ref} from 'vue';

const state = useStateStore()
const drawerState = ref(false)

</script>

<template>
  <div class="h-full flex gap-2">

    <el-card shadow="hover" class="grow">

    </el-card>

    <el-card v-if="state.windowWidth!=='sm'" shadow="hover" class="basis-1/5">

    </el-card>
  </div>

  <el-drawer v-model="drawerState">

  </el-drawer>
</template>
