<script setup lang="ts">
import usePersistedStore from '@/stores/persisted';
import {api} from '@/utils/axios';
import type {Guild} from '@/utils/tables';
import {useRouteQuery} from '@vueuse/router';
import {watchEffect} from 'vue';
import {ref} from 'vue';
import {useI18n} from 'vue-i18n';

const { t } = useI18n({ messages: {
  zh: {
    guildList: '公会列表',
    createGuild: '创建公会',
    myGuild: '我的公会',
    members: '成员',
  },
} })

const persisted = usePersistedStore()

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
          :style="{ backgroundImage: `url(${persisted.imgAddr}/guild-covers/${guild.slug})` }"
          class="bg-cover bg-center relative"
          body-class="h-full text-white flex flex-col gap-2 group"
          @click="$router.push(`/guilds/${guild.slug}`)"
        >
          <div class="z-10 flex items-center gap-2">
            <el-avatar
              :src="`${persisted.imgAddr}/guild-avatars/${guild.slug}`"
              class="ring-2 ring-slate-200"
            >
            </el-avatar>
            <div class="text-lg">{{guild.name}}</div>
            <div class="ms-auto">{{guild.userCount}} {{t('members')}}</div>
          </div>
          <div class="z-10 truncate">{{guild.subTitle}}</div>
          <div class="z-10">
            {{t('admin')}}: {{guild.userGuilds.map(ug => ug.user.name).join(', ')}}
          </div>
          <div class="inset-0 absolute bg-black/40 transition-colors duration-300 group-hover:bg-black/20">
          </div>
        </el-card>

      </el-card>

    </div>

    <div class="grow flex flex-col gap-4">
      <el-card
        shadow="hover"
        header-class="flex justify-between items-center"
      >
        <template #header>
          <div>{{t('myGuild')}}</div>
          <el-button type="primary">{{t('details')}}</el-button>
        </template>
      </el-card>
    </div>

  </div>
</template>
