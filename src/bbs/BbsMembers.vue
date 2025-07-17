<script setup lang="ts">
import {type User} from '@/utils/tables';
import LevelTag from '@/components/LevelTag.vue';
import {ref} from 'vue';
import {api} from '@/utils/axios';

const users = ref<User[]>([])
api.get<any, User[]>('/members').then(res => {
  users.value = res
}).catch(() => {})
</script>

<template>
  <el-card class="h-full">
    <el-table :data="users" @row-click="(row:User)=>$router.push(`/user/${row.name}`)">
      <el-table-column prop="name" :label="$t('bbs.members.name')" />
      <el-table-column :label="$t('bbs.members.level')">
        <template #default="scope">
          <level-tag :level="scope.row.level" />
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>
