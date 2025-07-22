<script setup lang="ts">
import usePersistedStore from '@/stores/persisted';
import type {User} from '@/utils/tables';

const persisted = usePersistedStore()

defineProps<{
  user: User,
}>()
</script>

<template>
  <div class="flex gap-1 items-center" @click.stop="$router.push(`/users/${user.name}`)">
    <img :src="`${persisted.imgAddr}/user-avatars/${user.name}`" class="rounded-full size-10" alt="" />
    <div>
      <div v-if="user.userRoles">
        <el-tag v-for="label in user.userRoles.map(userRole => userRole.role.label)" :key="label" size="small">
          {{label}}
        </el-tag>
      </div>
      <div class="text-sm text-slate-600">{{user.name}}</div>
    </div>
  </div>
</template>
