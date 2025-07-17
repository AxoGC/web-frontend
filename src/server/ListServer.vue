<script setup lang="ts">
import usePersistedStore from '@/stores/persisted';
import {api} from '@/utils/axios';
import type {Game, GameID} from '@/utils/tables';
import {useRouteQuery} from '@vueuse/router';
import {ref} from 'vue';
import {useI18n} from 'vue-i18n';

const persisted = usePersistedStore()
const page = useRouteQuery('page', 1, { transform: Number })
const pageSize = useRouteQuery('page_size', 10, { transform: Number })
const total = ref(10)

const { t } = useI18n({ messages: {
  zh: {
    serverList: '服务器列表',
    offline: '离线',
    online: '在线 {count} 人',
  },
} })

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

    <div class="grow min-w-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

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

    <div class="md:w-64">

    <el-card shadow="hover" class="h-72">

    </el-card>

    </div>

  </div>
</template>
