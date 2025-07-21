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
    admin: '管理员',
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

    <div class="grow-[2] space-y-4">

      <div class="card">

        <div class="mx-4 flex justify-between items-center">
          <div>{{t('guildList')}}</div>
          <el-button type="primary" @click="$router.push('/guilds/new')">
            {{t('createGuild')}}
          </el-button>
        </div>

        <div class="mt-4 grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">

          <div
            v-for="guild in guilds"
            :key="guild.id"
            :style="{ backgroundImage: `url(${persisted.imgAddr}/guild-covers/${guild.slug})` }"
            class="card bg-cover bg-center relative hover:scale-[1.02] text-white group space-y-2"
            @click="$router.push(`/guilds/${guild.slug}`)"
          >
            <div class="inset-0 absolute bg-black/40 transition duration-300 group-hover:bg-black/20">
            </div>
            <div class="relative flex items-center gap-2">
              <el-avatar
                :src="`${persisted.imgAddr}/guild-avatars/${guild.slug}`"
                class="ring-2 ring-slate-200"
              >
              </el-avatar>
              <div class="text-lg">{{guild.name}}</div>
              <div class="ms-auto">{{guild.userCount}} {{t('members')}}</div>
            </div>
            <div class="relative truncate">{{guild.subTitle}}</div>
            <div class="relative truncate">
              {{t('admin')}}: {{guild.userGuilds.map(ug => ug.user.name).join(', ')}}
            </div>
          </div>

        </div>

      </div>

    </div>

    <div class="grow space-y-4">
      <div class="card">
        <div class="flex justify-between items-center">
          <div>{{t('myGuild')}}</div>
          <el-button type="primary">{{t('details')}}</el-button>
        </div>
      </div>
    </div>

  </div>
</template>
