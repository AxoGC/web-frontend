<script setup lang="ts">
import {api} from '@/utils/axios';
import type {Server} from '@/utils/tables';
import {useRouteParams} from '@vueuse/router';
import {ref} from 'vue';
import {useI18n} from 'vue-i18n';

const { t } = useI18n({ messages: {
  zh: {
    routerBack: '返回服务器列表',
    onlineChartTitle: '近7日在线',

    docList: '文档列表',
    forumChat: '论坛交流',
  },
} })

const slug = useRouteParams<string>('server')

const server = ref<Server|null>(null)
api.get<any, Server>(`/servers/${slug.value}`).then(res => server.value = res)

</script>

<template>
  <div v-if="server" class="p-4 flex flex-col md:flex-row gap-4">

    <div class="grow-[2] flex flex-col gap-4">

      <el-card shadow="hover">
        <el-page-header @back="$router.back">
          <template #content>
            {{server.label}}
          </template>
        </el-page-header>
      </el-card>

      <el-card shadow="hover">

      </el-card>

      <el-card shadow="hover" header-class="flex justify-between items-center">
        <template #header>

        </template>
      </el-card>

    </div>

    <div class="grow flex flex-col gap-4">

      <el-card
        shadow="hover"
        class="h-64"
        header-class="flex justify-between items-center"
      >
        <template #header>
          <div>{{t('onlineChartTitle')}}</div>
          <el-button>{{t('details')}}</el-button>
        </template>
      </el-card>

      <el-card
        shadow="hover"
        class="h-64"
        header-class="flex justify-between items-center"
      >
        <template #header>
          <div>{{t('docList')}}</div>
          <el-button>{{t('details')}}</el-button>
        </template>
      </el-card>

      <el-card
        shadow="hover"
        class="h-64"
        header-class="flex justify-between items-center"
      >
        <template #header>
          <div>{{t('forumChat')}}</div>
          <el-button>{{t('details')}}</el-button>
        </template>
      </el-card>
    </div>

  </div>
</template>
