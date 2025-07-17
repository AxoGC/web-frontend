<script setup lang="ts">
import usePersistedStore from '@/stores/persisted';
import {api} from '@/utils/axios';
import type {Game, GameID, Online} from '@/utils/tables';
import {useRouteQuery} from '@vueuse/router';
import {computed, ref} from 'vue';
import {useI18n} from 'vue-i18n';
import VChart from 'vue-echarts';
import {use} from 'echarts/core';
import {LineChart} from 'echarts/charts';
import {GridComponent, TitleComponent} from 'echarts/components';
import {CanvasRenderer} from 'echarts/renderers';
import type {EChartsOption} from 'echarts';

const { t } = useI18n({ messages: {
  zh: {
    serverList: '服务器列表',
    offline: '离线',
    online: '在线 {count} 人',
    onlineChartTitle: '近 7 日在线',
  },
} })

use([TitleComponent, LineChart, GridComponent, CanvasRenderer])

const persisted = usePersistedStore()
const page = useRouteQuery('page', 1, { transform: Number })
const pageSize = useRouteQuery('page_size', 10, { transform: Number })
const total = ref(10)

const onlines = ref<Online[]>([])

api.get<any, Online[]>('/online').then(res => onlines.value = res)

const onlineChartOption = computed<EChartsOption>(() => ({
  title: {
    text: t('onlineChartTitle'),
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: onlines.value,
}))

interface Server {
  id: number
  port: number
  slug: string
  label: string
  gameId: GameID
  game: Game
  online: number | null
}

const servers = ref<Server[]>([])

async function listServers() {
  servers.value = await api.get<any, Server[]>(`/servers`)
}

listServers()
</script>

<template>
  <div class="p-4 flex flex-col md:flex-row gap-4">

    <div class="grow-[2] min-w-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

      <el-card
        v-for="server in servers"
        :key="server.id"
        shadow="hover"
        :body-style="{backgroundImage: `url(${persisted.imgAddr}/server-covers/${server.slug})`}"
        body-class="h-16"
        footer-class="flex justify-between"
        @click="$router.push(`/servers/${server.slug}`)"
      >
        <template #footer>
          <div class="text-left space-y-2">
            <div class="font-bold text-lg">{{server.label}}</div>
            <div>
              <img class="inline-block h-5" :src="`${persisted.imgAddr}/game-icons/${server.gameId}`" alt="">
              <span class="ms-2">{{server.game.label}}</span>
            </div>
            <div>
              {{t('port')}}: {{server.port}}
            </div>
          </div>
          <el-tag v-if="server.online" type="primary">
            {{t('online', { count: server.online })}}
          </el-tag>
          <el-tag v-else type="danger">
            {{t('offline')}}
          </el-tag>
        </template>
      </el-card>

    </div>

    <div class="md:w-64 grow">

    <el-card shadow="hover" body-class="h-72">
      <v-chart :option="onlineChartOption" autoresize />
    </el-card>

    </div>

  </div>
</template>
