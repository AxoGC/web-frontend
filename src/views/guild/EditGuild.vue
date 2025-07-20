<script setup lang="ts">
import {useRouteParams} from '@vueuse/router';
import {useI18n} from 'vue-i18n';

const { t } = useI18n({ messages: {
  zh: {
    createGuild: '创建公会',
    editGuild: '编辑公会',
  },
} })

const param = useRouteParams<string|undefined>('guild')

</script>

<template>
  <div class="max-w-5xl mx-auto p-4">
    <el-card shadow="hover">

      <template #header>
        <el-page-header @back="$router.back">
          <template #content>
            {{param ? `${t('editGuild')}: param` : t('createGuild')}}
          </template>
        </el-page-header>
      </template>

      <el-form>

      </el-form>

    </el-card>
  </div>
</template>
