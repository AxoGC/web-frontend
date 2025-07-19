<script setup lang="ts">
import {useRouteParams} from '@vueuse/router';
import {reactive, ref} from 'vue';
import {api} from '@/utils/axios';
import type {ForumGroup} from '@/utils/tables';
import {useI18n} from 'vue-i18n';

const { t } = useI18n({ messages: {
  zh: {
    addForumGroup: '添加论坛组',
    editForumGroup: '编辑论坛组',
  },
} })

const slug = useRouteParams<string|undefined>('forumGroup')
const form = reactive({
  slug: '',
  label: '',
  sort: 0,
  serverId: 0,
})

const forumGroup = ref<ForumGroup|null>(null)
api.get<any, ForumGroup>(`/forum-groups/${slug.value}`).then(res => forumGroup.value = res)
</script>

<template>
  <div class="max-w-5xl mx-auto p-4">
    <el-card shadow="hover">

      <template #header>
        <el-page-header @back="$router.back">
          <template #content>
            {{slug ? `${t('editForumGroup')}: ${slug}` : t('addForumGroup')}}
          </template>
        </el-page-header>
      </template>

      <el-form>
        <el-form-item :label="t('slug')">
          <el-input class="w-48" v-model="form.slug"></el-input>
        </el-form-item>
        <el-form-item :label="t('label')">
          <el-input class="w-48" v-model="form.label"></el-input>
        </el-form-item>
        <el-form-item :label="t('sort')">
          <el-input-number v-model="form.sort"></el-input-number>
        </el-form-item>
        <el-form-item :label="t('server')">
        </el-form-item>
      </el-form>

    </el-card>
  </div>
</template>
