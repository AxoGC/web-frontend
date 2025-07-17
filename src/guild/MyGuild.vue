<script setup lang="ts">
import useSessionStore from '@/stores/session';

const session = useSessionStore()

</script>

<template>
  <el-empty v-if="!session.user" :description="$t('guild.myGuild.logout')" />
  <el-empty v-else-if="!session.user.guild" :description="$t('guild.myGuild.noGuild')" />
  <el-descriptions v-else>

  </el-descriptions>

</template>
