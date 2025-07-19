<script setup lang="ts">
import MyGuild from './MyGuild.vue';
import {ref} from 'vue';
import useSessionStore from '@/stores/session';

const session = useSessionStore()

const drawerState = ref(false)

function createGuild() {

}
</script>

<template>
  <div class="h-full flex gap-2">

    <el-card shadow="hover" class="grow">
      <template #header>
        <div class="flex justify-between items-center">
          <div>{{$t('guild.list.title')}}</div>
          <div>
            <el-button @click="createGuild">
              {{$t('guild.list.createGuild')}}
            </el-button>
            <el-button @click="drawerState=true">
              {{$t('guild.list.myguild')}}
            </el-button>
          </div>
        </div>
      </template>
    </el-card>

    <el-card v-if="session.windowWidth!=='sm'" shadow="hover" class="basis-1/5" :header="$t('guild.list.myguild')">
      <my-guild />
    </el-card>

  </div>

  <el-drawer v-model="drawerState" size="60%" :title="$t('guild.list.myguild')">
    <my-guild />
  </el-drawer>
</template>
