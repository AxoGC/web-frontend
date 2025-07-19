<script setup lang="ts">
import {api} from '@/utils/axios';
import type {Guild} from '@/utils/tables';
import {useRouteQuery} from '@vueuse/router';
import {watch, watchEffect} from 'vue';
import {ref} from 'vue';
import {useI18n} from 'vue-i18n';

const { t } = useI18n({ messages: {
  zh: {
    guildList: '公会列表',
    createGuild: '创建公会',
  },
} })

const guilds = ref<Guild[]>([])
const page = useRouteQuery('page', 1, { transform: Number })
const pageSize = useRouteQuery('page_size', 10, { transform: Number })
const total = ref(0)

watchEffect(async () => {
  guilds.value = await api.get<any, Guild[]>(`/guilds?page=${page.value}&page_size=${pageSize.value}`)
})

</script>

<template>
  <div class="flex flex-col md:flex-row gap-4 p-4">

    <div class="grow-[2] flex flex-col gap-4">

      <el-card
        shadow="hover"
        header-class="flex justify-between items-center"
        body-class="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4"
      >

        <template #header>
          <div>{{t('guildList')}}</div>
          <el-button type="primary" @click="$router.push('/guilds/new')">
            {{t('createGuild')}}
          </el-button>
        </template>

        <el-card
          v-for="guild in guilds"
          :key="guild.id"
          shadow="hover"
        >
          {{guild}}
        </el-card>

      </el-card>

    </div>

    <div class="grow flex flex-col gap-4">

    </div>

  </div>
</template>
