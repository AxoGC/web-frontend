<script setup lang="ts">
import {api} from '@/utils/axios';
import type {Guild} from '@/utils/tables';
import {useRouteParams} from '@vueuse/router';
import {ref, watchEffect} from 'vue';
import {useI18n} from 'vue-i18n';

const { t } = useI18n({ messages: {
  zh: {
    memberList: '成员列表',
    admin: '管理员',
    member: '成员',
  },
} })

const param = useRouteParams<string>('guild')
const guild = ref<Guild|null>(null)
watchEffect(async () => {
  guild.value = await api.get<any, Guild>(`/guilds/${param.value}`)
})
</script>

<template>
  <div v-if="guild" class="p-4 flex flex-col md:flex-row gap-4">

    <div class="grow-[2] flex flex-col gap-4">

      <el-card shadow="hover">

        <template #header>
          <el-page-header @back="$router.back">
            <template #content>
              {{guild.name}}
            </template>
          </el-page-header>
        </template>

      </el-card>

    </div>

    <div class="grow flex flex-col gap-4">

      <el-card shadow="hover" body-class="flex flex-col">
        <template #header>
          {{t('memberList')}}
        </template>
        <div
          v-for="userGuild in guild.userGuilds"
          :key="userGuild.id"
          class="even:bg-slate-50 p-2 rounded-xl hover:bg-slate-100"
        >
          <el-tag :type="userGuild.userGuildStatusId === 'guild_admin' ? 'success' : 'primary'">
            {{userGuild.userGuildStatus.label}}
          </el-tag>
          {{userGuild.user.name}}
        </div>
      </el-card>

    </div>

  </div>
</template>
