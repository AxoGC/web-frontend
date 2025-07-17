<script setup lang="ts">
import useStateStore from '@/stores/state';
import GuildMembers from './GuildMembers.vue';
import {ref} from 'vue';
import type {Post} from '@/utils/tables';

const state = useStateStore()

const drawerState = ref(false)

const posts = ref<Post[]>([])

</script>

<template>
  <div class="h-full flex gap-2">

    <el-card shadow="hover" class="grow">
      <template #header>
        <div class="flex justify-between align-center">
          <div>{{$t('guild.bbs.title')}}</div>
          <div class="flex gap-2">
            <el-button>
              {{$t('guild.bbs.post')}}
            </el-button>
            <el-button>
              {{$t('guild.bbs.members')}}
            </el-button>
          </div>
        </div>
      </template>
      <el-table :data="posts">

      </el-table>
    </el-card>

    <el-card v-if="state.windowWidth!=='sm'" shadow="hover" class="basis-1/5">
      <guild-members />
    </el-card>

  </div>

  <el-drawer v-model="drawerState" :title="$t('guild.bbs.members')" size="60%">
    <guild-members />
  </el-drawer>
</template>
