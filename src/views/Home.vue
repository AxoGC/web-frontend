<script setup lang="ts">
import usePersistedStore from '@/stores/persisted';
import {api} from '@/utils/axios';
import type {Image} from '@/utils/tables';
import {ref} from 'vue';

const persisted = usePersistedStore()
const carousels = ref<Image[]>([])

api.get<any, Image[]>(`/carousels`).then(res => carousels.value = res)
</script>

<template>
  <el-carousel class="relative" height="calc(100vh - 60px)">
    <el-carousel-item
      v-for="carousel in carousels"
      :key="carousel.id"
      class="bg-cover bg-center flex flex-col justify-end p-12"
      :style="{backgroundImage: `url(${persisted.imgAddr}/images/${carousel.filename})`}"
    >
      <div class="absolute z-10 inset-0 bg-black/15"></div>
      <div class="absolute z-20 text-white text-2xl">{{carousel.label}}</div>
    </el-carousel-item>
    <div class="absolute z-20 top-1/2 left-1/2 text-5xl text-white -translate-x-1/2 -translate-y-1/2">
      Welcome to Axolotland!
    </div>
  </el-carousel>
</template>
