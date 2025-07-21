<script setup lang="ts">
import {api} from '@/utils/axios';
import type {Post} from '@/utils/tables';
import {Setting} from '@element-plus/icons-vue';
import dayjs from 'dayjs';
import {ref, watchEffect} from 'vue';
import {useI18n} from 'vue-i18n';

const { t } = useI18n({ messages: {
  zh: {
    recommend: '推荐内容',
    popular: '热门',
    latest: '最新',

  },
} })
</script>

<template>
  <el-card
    shadow="hover"
    class="flex flex-col"
    header-class="flex items-center gap-2"
    body-class="p-2 grow overflow-y-auto flex flex-col divide-y"
  >
    <template #header>
      <div>{{t('recommend')}}</div>
      <el-button :icon="Setting" circle class="ms-auto"></el-button>
      <el-segmented v-model="recommendOption" :options="recommendOptions" class="recommend-option">
      </el-segmented>
    </template>
    <div
      div v-for="recommend in recommends"
      :key="recommend.id"
      class="shrink-0 p-2 hover:bg-slate-100"
      @click="$router.push(`/posts/${recommend.slug}`)"
    >
      <div class="flex justify-between">
        <el-text size="large" truncated>
        {{recommend.title}}
        </el-text>
        <el-link truncated @click.stop="$router.push(`/forums/${recommend.forum.slug}`)"
          class="text-sm truncate">
          {{recommend.forum.title}}
        </el-link>
      </div>
      <div class="flex gap-2">
        <el-text truncated>
          {{recommend.user.name}}
        </el-text>
        <el-text truncated>
          {{dayjs(recommend.createdAt).format('MM月DD日 HH:mm')}}
        </el-text>
        <el-text truncated>
          {{recommend.reviewCount}}{{t('review')}}
        </el-text>
      </div>
    </div>
  </el-card>
</template>
