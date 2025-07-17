<script setup lang="ts">
import {api} from '@/utils/axios';
import type {Forum} from '@/utils/tables';
import {Close, Edit, Promotion} from '@element-plus/icons-vue';
import {ref} from 'vue';

defineProps<{forum: Forum|null}>()

const editStatus = ref(false)

async function edit() {
  const res = await api.patch('/forum', {
  })
}
</script>

<template>
  <div class="flex justify-between items-center gap-4">
    <div>{{ $t('bbs.forumInfo.title') }}</div>
    <div v-if="editStatus" class="flex">
      <el-button circle :icon="Promotion" type="success" @click="edit" />
      <el-button circle :icon="Close" type="info" @click="editStatus=false" />
    </div>
    <el-button v-else circle :icon="Edit" @click="editStatus=true" />
  </div>
  <el-divider />
</template>
